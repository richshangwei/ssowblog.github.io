const { chromium } = require('C:/Users/richs/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs'); const path = require('node:path'); const {pathToFileURL} = require('node:url');
const root=path.resolve(__dirname,'..'); const configs=JSON.parse(fs.readFileSync(path.join(root,'concepts.json'),'utf8'));
(async()=>{
 const browser=await chromium.launch({headless:true});const page=await browser.newPage();const errors=[];const remoteRequests=[];const results=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))remoteRequests.push(r.url());});
 for(const c of configs){
  await page.setViewportSize({width:1440,height:1050});await page.goto(pathToFileURL(path.join(root,c.id,'index.html')).href);
  const libraries=await page.evaluate(()=>({jquery:jQuery.fn.jquery,bootstrap:bootstrap.Modal.VERSION}));if(libraries.jquery!=='3.7.1'||!libraries.bootstrap.startsWith('5.'))throw Error(c.id+' libraries');
  for(const selector of ['#systemTitle','#loginForm','#newsList','.release-panel','.support-panel','.device-panel'])if(await page.locator(selector).count()!==1)throw Error(c.id+' required section '+selector);
  if(!(await page.title()).includes('CHGH-ESS'))throw Error('title audit code');
  const duplicateIds=await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);return ids.filter((id,i)=>ids.indexOf(id)!==i)});if(duplicateIds.length)throw Error('duplicate ids '+duplicateIds.join(','));
  await page.screenshot({path:path.join(root,c.id,'desktop-preview.png'),fullPage:true});
  if(await page.locator('.news-row').count()!==4)throw Error('all announcements');
  for(const scope of ['GLOBAL','SYSTEM']){await page.locator('[data-filter="'+scope+'"]').click();if(await page.locator('.news-row').count()!==2)throw Error('filter '+scope);}
  await page.locator('.news-row').first().click();await page.locator('#serviceModal').waitFor({state:'visible'});await page.waitForFunction(()=>!bootstrap.Modal.getInstance(document.getElementById('serviceModal'))._isTransitioning);await page.keyboard.press('Escape');await page.locator('#serviceModal').waitFor({state:'hidden'});
  await page.locator('#loginSubmit').click();if(await page.locator('#accountError').textContent()!=='請輸入員工帳號。')throw Error('empty validation');
  await page.locator('#account').fill('demo-staff');await page.locator('#password').fill('demo-only');await page.locator('#togglePassword').click();if(await page.locator('#password').getAttribute('type')!=='text')throw Error('password toggle');
  await page.locator('#loginSubmit').click();await page.waitForFunction(()=>!document.querySelector('#loginSubmit').disabled);if(!(await page.locator('#loginStatus').textContent()).includes('未進行身分驗證'))throw Error('demo status');if(await page.locator('#password').inputValue())throw Error('password retained');
  for(const kind of ['forgot','change','guide','manual','release','support','device','privacy','all']){await page.locator('[data-content="'+kind+'"]').first().click();await page.locator('#serviceModal').waitFor({state:'visible'});if(!(await page.locator('#serviceBody').textContent()).trim())throw Error('empty modal '+kind);await page.locator('.modal-done').click();await page.locator('#serviceModal').waitFor({state:'hidden'});}
  await page.locator('[data-filter="ALL"]').click();await page.locator('#account').fill('');await page.locator('#account').blur();
  for(const [width,height] of [[375,850],[390,844],[768,1024],[1024,768],[1440,1050],[812,375]]){
   await page.setViewportSize({width,height});const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);if(overflow)throw Error(c.id+' overflow '+width);
   const clipped=await page.locator('#account,#password,#loginSubmit,#systemTitle').evaluateAll(els=>els.filter(el=>{const r=el.getBoundingClientRect();return r.left < -1||r.right>innerWidth+1}).map(el=>el.id));if(clipped.length)throw Error(c.id+' clipped '+width+': '+clipped);
   if(width===375)await page.screenshot({path:path.join(root,c.id,'mobile-preview.png'),fullPage:true});
  }
  await page.emulateMedia({reducedMotion:'reduce'});const duration=await page.locator('.login-submit').evaluate(el=>getComputedStyle(el).transitionDuration);if(duration!=='0s')throw Error('reduced motion');await page.emulateMedia({reducedMotion:'no-preference'});
  results.push({id:c.id,name:c.name,libraries,passed:true});console.log(c.id+' passed');
 }
 await page.goto(pathToFileURL(path.join(root,'index.html')).href);if(await page.locator('.concept-card').count()!==10)throw Error('gallery count');
 await page.setViewportSize({width:1440,height:1050});await page.screenshot({path:path.join(root,'gallery-preview.png'),fullPage:true});
 await page.setViewportSize({width:375,height:850});if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('gallery overflow');
 if(errors.length||remoteRequests.length)throw Error(JSON.stringify({errors,remoteRequests}));
 fs.writeFileSync(path.join(root,'verification.json'),JSON.stringify({results,pageErrors:errors,remoteRequests,checks:['Bootstrap 5.3.3 and jQuery 3.7.1 loaded locally','all required sections and unique IDs','system identity in title','announcement global/system filters','Bootstrap modals and Escape','required fields and password toggle','demo submission and password clearing','all help links','375/390/768/1024/1440 widths, 812x375 landscape','reduced motion','ten-card gallery']},null,2));
 await browser.close();console.log('ALL TEN PASSED');
})().catch(e=>{console.error(e);process.exit(1)});

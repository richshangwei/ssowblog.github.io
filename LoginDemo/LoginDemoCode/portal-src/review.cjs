const {chromium}=require('C:/Users/richs/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');const fs=require('node:fs');const path=require('node:path');const {pathToFileURL}=require('node:url');const root=path.resolve(__dirname,'..');
(async()=>{const browser=await chromium.launch({headless:true});const page=await browser.newPage();const ds=JSON.parse(fs.readFileSync(path.join(root,'portal-designs.json'),'utf8'));const checks=[];const contrastIssues=[];
for(const d of ds){await page.setViewportSize({width:1440,height:1050});await page.goto(pathToFileURL(path.join(root,d.id,'index.html')).href);
 const issues=await page.evaluate(()=>{
  function rgba(s){const a=s.match(/[\d.]+/g)?.map(Number)||[255,255,255,1];return[a[0],a[1],a[2],a[3]??1]}
  function background(el){const layers=[];for(let p=el;p;p=p.parentElement)layers.push(rgba(getComputedStyle(p).backgroundColor));let color=[255,255,255];for(const c of layers.reverse())color=color.map((x,i)=>c[i]*c[3]+x*(1-c[3]));return color}
  const luminance=c=>c.map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4}).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0);
  const selectors='.form-label,.account-guide,.context-label,.context-name,.context-next,.login-submit,.contact-lines strong,.notice-summary,.status-panel p,.sample-badge,.portal-intro h1,.demo-bar summary,.header-nav a,.panel h2';
  return[...document.querySelectorAll(selectors)].filter(e=>e.getClientRects().length).map(e=>{const c=getComputedStyle(e),bg=background(e),fg=rgba(c.color),text=fg.slice(0,3).map((x,i)=>x*fg[3]+bg[i]*(1-fg[3]));const a=luminance(text),b=luminance(bg);const ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);const large=parseFloat(c.fontSize)>=24||(parseFloat(c.fontSize)>=18.66&&parseInt(c.fontWeight)>=700);return{element:e.className,text:e.textContent.trim().slice(0,35),ratio:Number(ratio.toFixed(2)),threshold:large?3:4.5}}).filter(x=>x.ratio<x.threshold);
 });if(issues.length)contrastIssues.push({id:d.id,issues});
 await page.screenshot({path:path.join(root,d.id,'desktop-preview.png'),fullPage:true});
 for(const [w,h]of [[375,850],[768,1024],[1024,768],[812,375]]){await page.setViewportSize({width:w,height:h});const overflow=await page.evaluate(()=>{const scroller=document.querySelector('.mobile-portal');return document.documentElement.scrollWidth>innerWidth+1||(scroller&&scroller.scrollWidth>scroller.clientWidth+1)});if(overflow)throw Error(d.id+' overflow '+w);if(w===375)await page.screenshot({path:path.join(root,d.id,'mobile-preview.png'),fullPage:true});
  if(d.id==='portal-09-mobile'){for(const id of ['account','password','loginSubmit']){await page.locator('#'+id).evaluate(el=>{el.focus();el.scrollIntoView({block:'center'})});const hidden=await page.locator('#'+id).evaluate(el=>{const r=el.getBoundingClientRect(),dock=document.querySelector('.mobile-task-dock').getBoundingClientRect();return r.bottom>dock.top+1||r.top<0});if(hidden)throw Error('dock covers '+id+' at '+w)}}
 }
 // Deep links must reveal the disclosure itself and its ancestors.
 if(d.id==='portal-02-focus-window'){await page.locator('a[href="#focus-help"]').click();if(!(await page.locator('#focus-help').getAttribute('open')!==null))throw Error('focus help disclosure');}
 checks.push({id:d.id,responsive:true});console.log(d.id+' visual layout checked');
}
await page.setViewportSize({width:1440,height:1050});await page.goto(pathToFileURL(path.join(root,'index.html')).href);await page.screenshot({path:path.join(root,'portal-overview.png'),fullPage:true});
fs.writeFileSync(path.join(root,'portal-visual-review.json'),JSON.stringify({checks,contrastIssues,note:'Computed text contrast spot checks on solid backgrounds, not a complete WCAG audit.'},null,2));await browser.close();console.log(JSON.stringify({contrastIssues}));})().catch(e=>{console.error(e);process.exit(1)});


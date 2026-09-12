"""重新產生 index.html：template.html + 前後視圖熱區路徑。

熱區路徑取自 pain-tracker/build 的 front-paths.svg / back-paths.svg。
改版面請改 template.html，改熱區形狀請改 body-map-v2 後重抽，再執行本檔。
"""
from pathlib import Path

HERE = Path(__file__).resolve().parent
OUT = HERE / "index.html"

html = (HERE / "template.html").read_text(encoding="utf-8")
html = html.replace("<!--FRONT_PATHS-->", (HERE / "front-paths.svg").read_text(encoding="utf-8").rstrip("\n"))
html = html.replace("<!--BACK_PATHS-->", (HERE / "back-paths.svg").read_text(encoding="utf-8").rstrip("\n"))
OUT.write_text(html, encoding="utf-8")
print(f"已產生 {OUT}（{len(html)} bytes）")

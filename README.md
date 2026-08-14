# Biocard — profile.sh --live

A small HTML/CSS profile demo. Open `index.html` to view the live output.

Below is the `index.html` source for convenience. Note: GitHub README will not execute HTML/JS — publish with GitHub Pages to see the live output and link to it from your profile README.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>profile.sh --live</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');

:root{
  --bg-app:#04060c;
  --bg-window-a:#0A101F;
  --bg-window-b:#0C1426;
  --bg-panel:#0A101F;
  --bg-titlebar:#0B1222;
  --border:rgba(255,255,255,0.10);
  --border-soft:rgba(255,255,255,0.08);
  --a1:#7C3AED;
  --a2:#22D3EE;
  --a3:#10B981;
  --hue-dim:#3b4a6b;
  --hue-soft:rgba(34,211,238,0.10);
  --live:#F87171;
  --text:#F8FAFC;
  --text-dim:#94A3B8;
  --text-faint:#475569;
  --leader:rgba(148,163,184,0.35);
  --mono:'IBM Plex Mono', 'SFMono-Regular', Menlo, Consolas, monospace;
}

[data-theme="light"]{
  --bg-app:#e9ebf2;
  --bg-window-a:#FBFBFE;
  --bg-window-b:#F1F0FB;
  --bg-panel:#FBFBFE;
  --bg-titlebar:#F2F1FA;
  --border:rgba(30,20,60,0.10);
  --border-soft:rgba(30,20,60,0.08);
  --a1:#7C3AED;
  --a2:#0891B2;
  --a3:#059669;
  --hue-dim:#b6b3d6;
  --hue-soft:rgba(124,58,237,0.08);
  --live:#c23b3b;
  --text:#1c1830;
  --text-dim:#5b5a72;
  --text-faint:#9491ab;
  --leader:rgba(90,85,120,0.35);
}

*{box-sizing:border-box;}
html,body{
  margin:0;
  padding:0;
  background:var(--bg-app);
  display:flex;
  align-items:center;
  justify-content:center;
  min-height:100vh;
  font-family:var(--mono);
}

.stage{
  padding:28px;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:14px;
}

.window-wrap{
  position:relative;
  width:1180px;
  max-width:96vw;
  border-radius:18px;
}
.window-wrap::before{
  content:'';
  position:absolute;
  inset:-10px;
  border-radius:26px;
  background:linear-gradient(90deg,var(--a1),var(--a2),var(--a3),var(--a1));
  background-size:300% 100%;
  filter:blur(14px);
  opacity:.42;
  animation:hueTravel 10s linear infinite;
  z-index:0;
}
.window-wrap::after{
  content:'';
  position:absolute;
  inset:-1.6px;
  border-radius:19px;
  padding:1.6px;
  background:linear-gradient(90deg,var(--a1),var(--a2),var(--a3),var(--a1));
  background-size:300% 100%;
  animation:hueTravel 10s linear infinite;
  -webkit-mask:linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite:xor;
  mask-composite:exclude;
  opacity:.65;
  z-index:2;
  pointer-events:none;
}
@keyframes hueTravel{
  0%{background-position:0% 0%;}
  100%{background-position:300% 0%;}
}

.window{
  position:relative;
  z-index:1;
  width:1180px;
  height:610px;
  max-width:96vw;
  background:linear-gradient(180deg, var(--bg-window-a), var(--bg-window-b));
  border-radius:18px;
  overflow:hidden;
  display:flex;
  flex-direction:column;
  box-shadow:0 40px 90px -30px rgba(0,0,0,0.65);
  transition:background .35s ease;
}

/* ---- title bar ---- */
.titlebar{
  position:relative;
  height:46px;
  min-height:46px;
  background:var(--bg-titlebar);
  border-bottom:1px solid var(--border);
  display:flex;
  align-items:center;
  padding:0 18px;
  gap:10px;
  font-size:12px;
  letter-spacing:.02em;
  color:var(--text-dim);
}
.tb-lights{display:flex;gap:8px;}
.tb-light{width:11px;height:11px;border-radius:50%;}
.tb-light.r{background:#ff5f56;}
.tb-light.y{background:#ffbd2e;}
.tb-light.g{background:#27c93f;}
.tb-cmd{
  position:absolute;
  left:50%;
  transform:translateX(-50%);
  color:var(--text-dim);
  white-space:nowrap;
}
.tb-cmd b{color:var(--text);font-weight:500;}
.tb-spacer{flex:1;}
.theme-toggle{
  border:1px solid var(--border);
  background:transparent;
  color:var(--text-dim);
  font-family:var(--mono);
  font-size:10.5px;
  letter-spacing:.06em;
  padding:3px 9px;
  border-radius:4px;
  cursor:pointer;
  position:relative;
  z-index:3;
}
.theme-toggle:hover{color:var(--text);border-color:var(--a2);}

/* ---- body split ---- */
.body{
  flex:1;
  display:flex;
  min-height:0;
}

.visual-col{
  width:38%;
  min-width:38%;
  border-right:1px solid var(--border);
  display:flex;
  flex-direction:column;
  background:
    radial-gradient(120% 90% at 30% 0%, var(--hue-soft), transparent 60%),
    var(--bg-panel);
}

.panel-label{
  font-size:10px;
  letter-spacing:.24em;
  color:var(--text-faint);
  padding:14px 16px 0 16px;
  display:flex;
  align-items:center;
  gap:8px;
}
.panel-label .rule{
  flex:1;
  height:1px;
  background:var(--border-soft);
}

.visual-frame{
  flex:1;
  margin:12px 16px 16px 16px;
  border:1px solid rgba(34,211,238,0.35);
  border-radius:10px;
  position:relative;
  overflow:hidden;
  box-shadow:0 0 22px -4px rgba(34,211,238,0.35), inset 0 0 30px -18px rgba(124,58,237,0.5);
  background:
    linear-gradient(180deg, var(--hue-soft), transparent 40%),
    var(--bg-window-a);
}
.visual-frame svg{
  width:100%;
  height:100%;
  display:block;
}
.frame-caption{
  position:absolute;
  left:10px;
  bottom:8px;
  font-size:9.5px;
  letter-spacing:.1em;
  color:var(--text-faint);
  display:flex;
  gap:6px;
  align-items:center;
}
.frame-caption .cap-live{
  color:var(--live);
  font-weight:600;
}

/* ---- info column ---- */
.info-col{
  flex:1;
  display:flex;
  flex-direction:column;
  min-width:0;
}

.rows-wrap{
  flex:1;
  padding:16px 20px 16px 20px;
  overflow:hidden;
}
svg.rows-svg{width:100%;height:100%;display:block;overflow:visible;}

.sysinfo-header-label{
  fill:var(--a2);
  font-size:13px;
  letter-spacing:.1em;
  text-shadow:0 0 10px rgba(34,211,238,0.55);
}
.live-dot-svg{
  fill:var(--live);
  animation:livePulseSvg 1.6s ease-in-out infinite;
  transform-origin:center;
  transform-box:fill-box;
}
@keyframes livePulseSvg{
  0%,100%{opacity:1;}
  50%{opacity:.25;}
}
.live-text-svg{
  fill:var(--live);
  font-size:12px;
  font-weight:700;
  letter-spacing:.08em;
}
.pill-rect-svg{
  fill:#4C1D95;
}
[data-theme="light"] .pill-rect-svg{ fill:#7C3AED; }
.pill-text-svg{
  fill:#E9D5FF;
  font-size:14px;
  font-weight:700;
  letter-spacing:.02em;
}
[data-theme="light"] .pill-text-svg{ fill:#fff; }
.closing-line-svg{
  fill:var(--text-dim);
  font-size:14px;
}
.closing-cursor-svg{
  fill:var(--a2);
  animation:blinkSvg 1s step-start infinite;
}
@keyframes blinkSvg{50%{opacity:0;}}

.section-tag{
  fill:var(--text-dim);
  font-size:13px;
  letter-spacing:.1em;
}
.row-label{
  fill:var(--a2);
  font-size:14px;
}
.row-value{
  fill:var(--text);
  font-size:14px;
  font-weight:600;
}
a.row-link{cursor:pointer;}
.row-link .row-value{fill:var(--a2);}
.row-link .row-value:hover{text-decoration:underline;}
.row-anim{opacity:0;animation:rowIn .4s ease forwards;}
@keyframes rowIn{ from{opacity:0; transform:translateX(-8px);} to{opacity:1; transform:translateX(0);} }
</style>

</body>
</html>
```

---

Publish note: to see the live rendered page from your GitHub profile, publish this repo with GitHub Pages and add a link or screenshot in your profile README.

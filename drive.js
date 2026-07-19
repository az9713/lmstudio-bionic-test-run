// ponytail: minimal CDP driver for Bionic (Electron). Usage: node drive.js <cmd> [args]
const { chromium } = require('playwright-core');

async function main() {
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const ctx = browser.contexts()[0];
  const pages = ctx.pages();
  const page = pages.find(p => !p.url().startsWith('devtools://')) || pages[0];
  const [cmd, ...args] = process.argv.slice(2);

  if (cmd === 'shot') {
    await page.screenshot({ path: args[0] || 'shot.png' });
    console.log('url:', page.url(), '| pages:', pages.map(p => p.url()).join(', '));
  } else if (cmd === 'click') {
    await page.mouse.click(parseInt(args[0]), parseInt(args[1]));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: args[2] || 'shot.png' });
  } else if (cmd === 'type') {
    await page.keyboard.type(args[0], { delay: 20 });
    await page.waitForTimeout(500);
    await page.screenshot({ path: args[1] || 'shot.png' });
  } else if (cmd === 'key') {
    await page.keyboard.press(args[0]);
    await page.waitForTimeout(1500);
    await page.screenshot({ path: args[1] || 'shot.png' });
  } else if (cmd === 'text') {
    console.log(await page.evaluate(() => document.body.innerText.slice(0, 6000)));
  } else if (cmd === 'find') {
    // list clickable elements containing text
    const needle = args[0].toLowerCase();
    const hits = await page.evaluate((n) => {
      const out = [];
      for (const el of document.querySelectorAll('button, a, [role="button"], input, textarea, [contenteditable]')) {
        const t = (el.innerText || el.placeholder || '').trim();
        const r = el.getBoundingClientRect();
        if (r.width && r.height && (t.toLowerCase().includes(n) || n === '*'))
          out.push({ text: t.slice(0, 60), x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2), tag: el.tagName });
      }
      return out;
    }, needle);
    console.log(JSON.stringify(hits, null, 1));
  }
  await browser.close();
}
main().catch(e => { console.error(e.message); process.exit(1); });

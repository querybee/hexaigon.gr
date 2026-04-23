import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "..", "public", "projects");

const TARGETS = [
  { slug: "viliotis-ilias-accountant", url: "https://viliotis-ilias-accountant.vercel.app/" },
];

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

const run = async () => {
  const browser = await chromium.launch();
  for (const { slug, url } of TARGETS) {
    for (const [label, viewport] of [["desktop", DESKTOP], ["mobile", MOBILE]]) {
      const ctx = await browser.newContext({
        viewport,
        deviceScaleFactor: 2,
        userAgent:
          label === "mobile"
            ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
            : undefined,
      });
      const page = await ctx.newPage();
      await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
      await page.waitForTimeout(2000);
      const out = path.join(OUT_DIR, `${slug}-${label}.png`);
      await page.screenshot({ path: out, fullPage: false });
      console.log(`Saved ${out}`);
      await ctx.close();
    }
  }
  await browser.close();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

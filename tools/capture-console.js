const { chromium } = require("playwright");

(async () => {
  const url = process.argv[2] || "http://127.0.0.1:4200/";
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log(`Opening ${url} and capturing console output...`);

  page.on("console", (msg) => {
    try {
      const args = msg.args().map((a) => a.toString());
      console.log(
        `[console:${msg.type()}] ${msg.text()} ${
          args.length ? "| args:" + args.join(",") : ""
        }`
      );
    } catch (e) {
      console.log(`[console:${msg.type()}] ${msg.text()}`);
    }
  });

  page.on("pageerror", (err) => {
    console.log("[pageerror] " + err.stack || err.message || err);
  });

  page.on("requestfailed", (req) => {
    console.log(
      "[requestfailed] " + req.url() + " " + req.failure()?.errorText
    );
  });

  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 15000 });
    // wait a bit for runtime console logs to appear
    await page.waitForTimeout(2500);
  } catch (err) {
    console.log("[error] navigation failed: " + err.message);
  }

  console.log("Done capturing — closing browser.");
  await browser.close();
})();

import puppeteer from "puppeteer";

export async function scrape(url, selectArrayLoader, returnSelector) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  if (!url || !returnSelector) {
    new Error("Ошибка не указан url или returnSelector");
  }

  await page.goto(url);

  if (Array.isArray(selectArrayLoader)) {
    for (const select of selectArrayLoader) {
      await page.waitForSelector(select, {
        visible: true,
      });
    }
  }

  const result = await page.evaluate((returnSelector) => {
    return document.querySelector(returnSelector).innerHTML;
  }, returnSelector);

  return { result, page };
}

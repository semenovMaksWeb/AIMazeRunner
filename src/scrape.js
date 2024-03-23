import puppeteer from "puppeteer";
import { ENV } from "../env.js";

export async function scrape(
  url,
  selectArrayLoader,
  returnSelector,
  clickSelector
) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1980,
      height: 1080,
    },
  });
  
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

  if (Array.isArray(clickSelector)) {
    for (const select of clickSelector) {
      await page.click(select);
    }
  }

  const result = await page.evaluate((returnSelector) => {
    return document.querySelector(returnSelector).innerHTML;
  }, returnSelector);

  return { result, page };
}

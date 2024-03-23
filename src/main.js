import { aiRun } from "./ai.js";
import { parsingDom } from "./parsingDom.js";
import { scrape } from "./scrape.js";
import { ENV } from "../env.js";

(async () => {
  // Открыть браузер
  const { result, page } = await scrape(
    ENV.PATH,
    ENV.INIT_DOM_SELECTOR,
    ENV.RETURN_HTML_DOM,
    ENV.CLICK_DOM_SELECTOR
  );
  // парсинг может отличаться от страницы с лабиринтов
  let schemaJson = null;
  if (ENV.PASRING_ING) {
    await page.screenshot({ path: "temp/fullpage.png", fullPage: true });
  } else {
    schemaJson = parsingDom(result);
  }
  // ai который из schem вызывает логику перемещения
  await aiRun(schemaJson, page);
})();

import { aiRun } from "./ai.js";
import { parsingDom } from "./parsingDom.js";
import { scrape } from "./scrape.js";

const path = "file:///C:/Users/Maks/Desktop/II/lab/temp/3.html";
// const path = "http://lohmatik.ru/Lohmatik/str1_2_4.php";

(async () => {
  const { result, page } = await scrape(path, ["#labdiv"], "#labdiv");
  const schemaJson = parsingDom(result);
  await aiRun(schemaJson, page);
})();

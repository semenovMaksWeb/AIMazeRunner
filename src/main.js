import { aiRun } from "./ai.js";
import { parsingDom } from "./parsingDom.js";
import { scrape } from "./scrape.js";

// (async () => {
//   const textDom = await scrape(
//     "http://lohmatik.ru/Lohmatik/str1_2_1.php",
//     ["#labdiv"],
//     "#labdiv tbody"
//   );
//   console.log(textDom);
// })();

const path = "file:///C:/Users/Maks/Desktop/II/lab/temp/1.html";

(async () => {
  const textDom = await scrape(path, null, "table");
  const fixDom = `<table>${textDom}</table>`;
  const schemaJson = parsingDom(fixDom);
  console.log(schemaJson);
  aiRun(schemaJson);
})();

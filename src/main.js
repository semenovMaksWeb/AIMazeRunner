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

(async () => {
  const textDom = await scrape(
    "file:///C:/Users/Maks/Desktop/II/lab/temp/1.html",
    null,
    "table"
  );
  const fixDom = `<table>${textDom}</table>`;
  parsingDom(fixDom);
})();

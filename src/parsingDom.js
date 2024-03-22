import Window from "window";
const window = new Window();

export function parsingDom(textDom) {
  const domElement = window.document.createElement("div");
  domElement.innerHTML = textDom;
  let indexRow = -1;
  let indexCol = -1;

  for (const tr of domElement.querySelectorAll("tr")) {
    indexCol = -1;
    indexRow++;

    for (const td of tr.querySelectorAll("td")) {
      indexCol++;
      console.log("-----------------------");
      console.log("indexRow", indexRow);
      console.log("indexCol", indexCol);
      console.log("border-bottom", td.style["border-bottom"]);
      console.log("border-top", td.style["border-top"]);
      console.log("border-left", td.style["border-left"]);
      console.log("border-right", td.style["border-right"]);
      console.log("-----------------------");
    }
  }
}

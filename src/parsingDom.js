import Window from "window";
const window = new Window();

export function parsingDom(textDom) {
  const jsonSchema = [];

  const filterSchema = (indexRow, indexCol) => {
    return jsonSchema.find(
      (e) => e.indexCol == indexCol && e.indexRow == indexRow
    );
  };


  const saveObjectFix = () => {
    for (const elem of jsonSchema) {
      if (elem.indexCol == 0 && elem.indexRow == 0) {
        continue;
      }

      const elemBottom = filterSchema(elem.indexRow + 1, elem.indexCol);
      
      if (elemBottom && !elemBottom.position.top) {
        delete elem.position.bottom;
      }

      if (elem.indexCol != 0) {
        const elemLeft = filterSchema(elem.indexRow, elem.indexCol - 1);
        if (!elemLeft.position.right) {
          delete elem.position.left;
        }
      }
    }
  };

  const forDom = () => {
    const domElement = window.document.createElement("div");
    domElement.innerHTML = textDom;
    let indexRow = -1;
    let indexCol = -1;
    const trList = domElement.querySelectorAll("tr");
    for (const tr of trList) {
      indexCol = -1;
      indexRow++;
      const tdList = tr.querySelectorAll("td");
      for (const td of tdList) {
        indexCol++;
        const object = {
          indexCol: indexCol,
          indexRow: indexRow,
          position: {},
        };

        if (td.classList.contains("start")) {
          object.start = true;
        }

        if (td.classList.contains("end")) {
          object.end = true;
        }

        if (!td.style["border-bottom"]) {
          object.position["bottom"] = true;
        }

        if (!td.style["border-top"]) {
          object.position["top"] = true;
        }

        if (!td.style["border-left"]) {
          object.position["left"] = true;
        }

        if (!td.style["border-right"]) {
          object.position["right"] = true;
        }
        jsonSchema.push(object);
      }
    }
  };
  forDom();
  saveObjectFix();
  return jsonSchema;
}

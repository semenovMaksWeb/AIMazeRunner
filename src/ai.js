export function aiRun(config) {
  const history = [];
  const start = config.filter((e) => e.start)[0];
  let acitveCell = start;

  const findNewCell = (newXod) => {
    return config.filter(
      (e) =>
        e.indexCol == newXod.indexCol &&
        e.indexRow == newXod.indexRow &&
        Object.keys(acitveCell.position).length
    )[0];
  };

  const checkXod = (key) => {
    const newXod = {
      indexRow: acitveCell.indexRow,
      indexCol: acitveCell.indexCol,
    };

    if (key == "bottom") {
      newXod.indexRow++;
    }

    if (key == "top") {
      newXod.indexRow--;
    }

    if (key == "left") {
      newXod.indexCol--;
    }

    if (key == "right") {
      newXod.indexCol++;
    }
    return newXod;
  };

  const oppositePosition = (key) => {
    if (key == "left") {
      return "right";
    }
    if (key == "right") {
      return "left";
    }
    if (key == "top") {
      return "bottom";
    }
    if (key == "bottom") {
      return "top";
    }
  };

  while (true) {
    if (acitveCell.end || history.length == 10) {
      history.push({ action: "Конец вид конфига", params: config });
      break;
    }
    let key = null;

    if (Object.keys(acitveCell.position).length == 1) {
      key = Object.keys(acitveCell.position)[0];
    } else {
      console.log(acitveCell);
      if ("left" in acitveCell.position) {
        key = "left";
      }

      if ("right" in acitveCell.position) {
        key = "right";
      }

      if ("bottom" in acitveCell.position) {
        key = "bottom";
      }

      if ("top" in acitveCell.position) {
        key = "top";
      }
    }

    if (key == null) {
      history.push({
        action: "Ошибка не знаю куда идти конфиг",
        params: config,
      });
      break;
    }

    const newXod = checkXod(key);
    console.log("findNewCell(newXod)\n");
    console.log(findNewCell(newXod));
    const cellNew = findNewCell(newXod);

    if (cellNew) {
      delete acitveCell.position[key]
      delete cellNew.position[oppositePosition(key)];
      acitveCell = cellNew;
      history.push({ action: "переход на колонку", params: JSON.stringify(cellNew) });
    }
  }
  console.log("history --------- \n");
  console.log(history);
}

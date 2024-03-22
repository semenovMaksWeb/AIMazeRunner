export function aiRun(config) {
  const history = [];
  const oldCheckXod = [];
  const oldClick = [];
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
      oldClick.push("top");
    }

    if (key == "top") {
      newXod.indexRow--;
      oldClick.push("bottom");
    }

    if (key == "left") {
      newXod.indexCol--;
      oldClick.push("right");
    }

    if (key == "right") {
      newXod.indexCol++;
      oldClick.push("left");
    }
    return newXod;
  };

  const magicXodOld = () => {
    history.push({
      action: "Магический переход!",
      params: JSON.stringify(oldCheckXod[oldCheckXod.length - 1]),
    });
    //todo магический переход потом нужно делать симуляцию кликов!
    const position = {
      indexRow: acitveCell.indexRow,
      indexCol: acitveCell.indexCol,
    };

    const oldCell = oldCheckXod[oldCheckXod.length - 1];
    let index = oldClick.length;
    while (true) {
      index--;
      const item = oldClick[index];
      if(position.indexCol == oldCell.indexCol && position.indexRow == oldCell.indexRow){
        break;
      }
      if (item == "bottom") {
        position.indexRow++;
      }
      if (item == "top") {
        position.indexRow--;
      }
      if (item == "left") {
        position.indexCol--;
      }
      if (item == "right") {
        position.indexRow++;
      }
    }

    if (
      acitveCell.indexRow != oldCell.indexRow &&
      acitveCell.indexCol == oldCell.indexCol
    ) {
      new Error("Не правильно идет рассчет!");
    }
    // acitveCell = oldCell;
    if (Object.keys(acitveCell.position).length == 1) {
      oldCheckXod.pop();
    }
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
    if (acitveCell.end) {
      break;
    }
    let key = null;

    if (Object.keys(acitveCell.position).length == 0) {
      magicXodOld();
      continue;
    }

    if (Object.keys(acitveCell.position).length == 1) {
      key = Object.keys(acitveCell.position)[0];
    } else {
      console.log("oldCheckXodSave", acitveCell);
      oldCheckXod.push(acitveCell);
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
      magicXodOld();
      continue;
    }

    const newXod = checkXod(key);
    const cellNew = findNewCell(newXod);

    if (cellNew) {
      delete acitveCell.position[key];
      delete cellNew.position[oppositePosition(key)];
      acitveCell = cellNew;
      history.push({
        action: "переход на колонку",
        params: JSON.stringify(cellNew),
      });
    }
  }
  console.log("history --------- \n");
  console.log(history);
}

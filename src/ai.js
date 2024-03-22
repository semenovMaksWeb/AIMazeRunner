import { delay, randomInteger } from "./lib.js";
export async function aiRun(config, page) {
  // история действии
  const history = [];
  // точка куда нужно вернуться что бы изучить др. путь
  const oldCheckXod = [];
  // старый ходы для возвращанифя назад
  const oldClick = [];
  // точка начала логики
  const start = config.filter((e) => e.start)[0];
  // активная ячейка
  let acitveCell = start;

  // поиск новой ячейки
  const findNewCell = (newXod) => {
    return config.filter(
      (e) =>
        e.indexCol == newXod.indexCol &&
        e.indexRow == newXod.indexRow &&
        Object.keys(acitveCell.position).length
    )[0];
  };
  // проверку куда нужно двигаться дальше
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
  // возвращения назад
  const magicXodOld = async () => {
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
      if (!item || position.indexCol < 0 || position.indexRow < 0) {
        console.log("oldClick", oldClick);
        new Error("Ошибка!");
        break;
      }
      
      if (
        position.indexCol == oldCell.indexCol &&
        position.indexRow == oldCell.indexRow
      ) {
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
        position.indexCol++;
      }
      console.log(`возвращаюсь назад: ${item}`);
      await clickKey(item);
      oldClick.pop();
    }

    if (
      acitveCell.indexRow != oldCell.indexRow &&
      acitveCell.indexCol != oldCell.indexCol
    ) {
      new Error("Не правильно идет рассчет!");
    }
    acitveCell = oldCell;
    if (Object.keys(acitveCell.position).length == 1) {
      oldCheckXod.pop();
    }
  };

  // обратное направление используется для удаление старый путей
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

  const clickKey = async (key) => {
    const millisecondsStart = randomInteger(100, 200);
    await delay(millisecondsStart);
    if (key == "bottom") {
      await page.keyboard.down("ArrowDown");
    }
    if (key == "top") {
      await page.keyboard.down("ArrowUp");
    }
    if (key == "left") {
      await page.keyboard.down("ArrowLeft");
    }
    if (key == "right") {
      await page.keyboard.down("ArrowRight");
    }
    const millisecondsEnd = randomInteger(100, 200);
    await delay(millisecondsEnd);
  };

  while (true) {
    if (acitveCell.end) {
      // мы нашли выход
      console.log("победа?!");
      break;
    }
    let key = null;
    // нужно возвращаться назад ибо идти не куда
    if (Object.keys(acitveCell.position).length == 0) {
      // todo ошибка в html 3 { indexCol: 39, indexRow: 22, position: {} }
      await magicXodOld();
      continue;
    }
    // 1 путь куда идти
    if (Object.keys(acitveCell.position).length == 1) {
      key = Object.keys(acitveCell.position)[0];
    } else {
      // несколько путей  + сохраняем точку
      oldCheckXod.push(acitveCell);
      // определяем направление
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
    // направление нет идем назад
    if (key == null) {
      await magicXodOld();
      continue;
    }
    // идем в новую клетку
    const newXod = checkXod(key);
    const cellNew = findNewCell(newXod);

    // есть куда идти переходим
    delete acitveCell.position[key];
    delete cellNew.position[oppositePosition(key)];
    acitveCell = cellNew;
    history.push({
      action: "переход на колонку",
      params: JSON.stringify(cellNew),
    });
    console.log(`движение в ${key}`);
    await clickKey(key);
  }

  // console.log("history --------- \n");
  // console.log(history);
}

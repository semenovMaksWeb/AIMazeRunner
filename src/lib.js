import { ENV } from "../env.js";

export function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export function CustomConsole(val) {
  if (ENV.CONSOLE) {
    console.log(val);
  }
}

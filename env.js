export const ENV = {
  // сайт куда зайди
  PATH: "https://wayout.zone/ru/",
  // какой dom элементы нужно дождаться
  INIT_DOM_SELECTOR: ["#startMazeBtn"],
  CLICK_DOM_SELECTOR: ["#startMazeBtn"],
  // из чего получить верстку лабиринта
  // случайное время ожидание перед кликом от MIN до MAX
  DELAY_PRE: { MIN: 100, MAX: 200 },
  // случайное время ожидание после клика от MIN до MAX
  DElAY_POST: { MIN: 100, MAX: 200 },
  HISTORY: false,
  CONSOLE: true,
  PASRING_ING: true,
  COOKIES: {
    cookie_settings: "%7B%22cookie_show%22%3A%22%22%2C%22dark_mode%22%3A%22no%22%7D",
    csrftoken: "9hqwfkZuXcP9jpdpwSSPcncEOzfwv7xpI2fFLLjM5ztzU4VemVvVAFWb6AgJjPaa",
    sessionid: "2u0zit5nptm9fkxwiqwc7dqvuuwqxcia"
  }
};

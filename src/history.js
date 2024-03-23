import { ENV } from "../env.js";

export function historyStore() {
  const history = [];

  const saveHistory = (val) => {
    if (ENV.HISTORY) {
      history.push(val);
    }
  };

  const getHistory = () => {
    if (ENV.HISTORY) {
      return history;
    }
  };

  return {
    saveHistory,
    getHistory,
  };
}

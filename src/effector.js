const {
  createStore,
  createEffect,
  createEvent,
  forward,
} = require("effector-root");
const axios = require("axios");

const httpClient = axios.create({});

const initApp = createEvent();

const getTodosFx = createEffect({
  handler: async () => {
    const { data } = await httpClient.get("/todos?_limit=5");
    return data;
  },
});

const $todos = createStore([]);

$todos.on(getTodosFx.doneData, (_, todos) => {
  return todos;
});

forward({
  from: initApp,
  to: getTodosFx,
});

module.exports = { todos: $todos, getTodosFx, initApp };

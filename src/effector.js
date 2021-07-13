import { createStore, createEffect, createEvent, forward } from "effector-root";
import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const initApp = createEvent();

const getTodosFx = createEffect({
  handler: async () => {
    const { data } = await httpClient.get("/todos?_limit=5");
    return data;
  },
});

const $todos = createStore([]);

const $testStore = createStore("");

$todos.on(getTodosFx.doneData, (_, todos) => {
  return todos;
});

forward({
  from: initApp,
  to: getTodosFx,
});

export { $todos as todos, getTodosFx, initApp, $testStore };

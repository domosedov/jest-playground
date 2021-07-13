"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initApp = exports.getTodosFx = exports.todos = void 0;

var _effectorRoot = require("effector-root");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const httpClient = _axios.default.create({});

const initApp = (0, _effectorRoot.createEvent)({
  name: "initApp",
  sid: "z0erep"
});
exports.initApp = initApp;
const getTodosFx = (0, _effectorRoot.createEffect)({
  handler: async () => {
    const {
      data
    } = await httpClient.get("/todos?_limit=5");
    return data;
  }
}, {
  name: "getTodosFx",
  sid: "-e15okc"
});
exports.getTodosFx = getTodosFx;
const $todos = (0, _effectorRoot.createStore)([], {
  name: "$todos",
  sid: "-t0jawq"
});
exports.todos = $todos;
$todos.on(getTodosFx.doneData, (_, todos) => {
  return todos;
});
(0, _effectorRoot.forward)({
  ɔ: {
    from: initApp,
    to: getTodosFx
  },
  config: {
    sid: "-sivaik"
  }
});

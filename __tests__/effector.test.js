const { getTodosFx, todos, initApp } = require("../src/effector");
const { root, fork, allSettled } = require("effector-root");
const { rest } = require("msw");
const { setupServer } = require("msw/node");

const server = setupServer(
  rest.get("/todos", (req, res, ctx) => {
    const query = req.url.searchParams;
    const limit = query.get("_limit");
    return res(ctx.json(Array(+limit).fill("Todo")));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("effector", () => {
  it("should return array with mock server", async () => {
    const scope = fork(root);

    await allSettled(initApp, { scope });

    expect(scope.getState(todos)).toHaveLength(5);
  });

  it("should return array with jest mock", async () => {
    let getTodosFxMock = jest.fn(() => [1, 2, 3, 4]);
    const scope = fork(root, {
      handlers: new Map([[getTodosFx, getTodosFxMock]]),
    });

    await allSettled(initApp, { scope });

    expect(getTodosFxMock).toBeCalledTimes(1);
    expect(scope.getState(todos)).toHaveLength(4);
  });
});

import { getTodosFx, todos, initApp, $testStore } from "../src/effector";
import { root, fork, allSettled } from "effector-root";
import { rest } from "msw";
import { setupServer } from "msw/node";

const API_URL = "https://jsonplaceholder.typicode.com";

const apiUrl = (path) => {
  return new URL(path, API_URL).toString();
};

const server = setupServer(
  rest.get(apiUrl("/todos"), (req, res, ctx) => {
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

  it("should test store return test string", async () => {
    const scope = fork(root, {
      values: new Map([[$testStore, "test"]]),
    });

    await allSettled(initApp, { scope });

    expect(scope.getState($testStore)).toBe("test");
  });

  it("test handlers", async () => {
    const scope = fork(root, {
      handlers: new Map([[getTodosFx, () => [1, 2, 3]]]),
    });

    await allSettled(initApp, { scope });

    expect(scope.getState(todos)).toHaveLength(3);
  });
});

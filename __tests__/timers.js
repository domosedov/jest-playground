describe("Test timers", () => {
  it("invoked after 2sec", () => {
    jest.useFakeTimers();

    const myFunc = jest.fn();

    const runWithDelay = (fn, d) => {
      setTimeout(() => fn(), d);
    };

    runWithDelay(myFunc, 1000);
    jest.runAllTimers();

    expect(myFunc).toHaveBeenCalled();
  });
});

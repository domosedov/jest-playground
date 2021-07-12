const { sum } = require("../src/utils");

describe("utils", () => {
  it("2+2=4", () => {
    expect(sum(2, 2)).toBe(4);
  });

  it("test", () => {
    expect(sum(2, "2")).toHaveLength(2);
  });
});

const { expect } = require("chai");

const { to } = require("helpers/promise");

const asyncSetTimeout = ({ shoudlThrowError, resolveResult, rejectResult }) =>
  new Promise((res, rej) => {
    const callbackFunction = shoudlThrowError
      ? () => rej(rejectResult)
      : () => res(resolveResult);
    setTimeout(callbackFunction);
  });

describe("Verify promise functionality", () => {
  it("should return [null, object] without error", async () => {
    const [error, result] = await to(
      asyncSetTimeout({
        shoudlThrowError: false,
        resolveResult: {},
        rejectResult: { message: "error" }
      })
    );

    expect(error).to.be.a("null");
    expect(result).to.be.a("object");
  });

  it("should return [null, 'succes'] without error", async () => {
    const [_, result] = await to(
      asyncSetTimeout({
        shoudlThrowError: false,
        resolveResult: "succes",
        rejectResult: { message: "error" }
      })
    );

    expect(result).to.equal("succes");
  });

  it("should return throw an error", async () => {
    const [error, result] = await to(
      asyncSetTimeout({
        shoudlThrowError: true,
        resolveResult: "succes",
        rejectResult: { message: "error" }
      })
    );
    expect(error).to.be.a("string");
    expect(result).to.be.a("null");
  });
});

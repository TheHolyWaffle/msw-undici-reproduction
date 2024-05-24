const { setupServer } = require("msw/node");
const { http, HttpResponse } = require("msw");
const { fetch } = require("undici");

const server = setupServer();

beforeAll(() =>
  server.listen({
    onUnhandledRequest: "error",
  })
);

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

describe("Test", () => {
  it("should pass", async () => {
    server.use(
      http.get("https://example.com", () => {
        return HttpResponse.text("Hello World");
      })
    );
    const result = await fetch("https://example.com").then((r) => r.text());
    expect(result).toBe("Hello World");
  });
});

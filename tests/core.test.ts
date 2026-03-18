import { describe, it, expect } from "vitest";
import { Prepareai } from "../src/core.js";
describe("Prepareai", () => {
  it("init", () => { expect(new Prepareai().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Prepareai(); await c.analyze(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Prepareai(); await c.analyze(); c.reset(); expect(c.getStats().ops).toBe(0); });
});

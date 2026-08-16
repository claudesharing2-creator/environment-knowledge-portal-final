import { describe, expect, it } from "vitest";
import { getStatic, listStatic } from "./staticPortal";

describe("bundled learning domains", () => {
  it("contains every audited learning aspect D01-D11", () => {
    const domains = listStatic("domain", 20);
    expect(domains).toHaveLength(11);
    for (let index = 1; index <= 11; index += 1) {
      const id = `D${String(index).padStart(2, "0")}`;
      const item = getStatic("domain", id.toLowerCase());
      expect(item?.id).toBe(id);
      expect(item?.title).toBeTruthy();
      expect(item?.refs.length).toBeGreaterThan(0);
    }
  });
});

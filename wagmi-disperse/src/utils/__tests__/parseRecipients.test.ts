import { describe, expect, it } from "vitest";
import { parseRecipients } from "../parseRecipients";

describe("parseRecipients", () => {
  it("should parse recipients with space separator", () => {
    const input = "0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 3.141592";
    const result = parseRecipients(input, 18);

    expect(result).toHaveLength(1);
    expect(result[0].address).toBe("0x314ab97b76e39d63c78d5c86c2daf8eaa306b182");
    expect(result[0].value).toBe(3141592000000000000n);
  });

  it("should parse recipients with comma separator", () => {
    const input = "0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a,2.7182";
    const result = parseRecipients(input, 18);

    expect(result).toHaveLength(1);
    expect(result[0].address).toBe("0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a");
    expect(result[0].value).toBe(2718200000000000000n);
  });

  it("should parse recipients with equals separator", () => {
    const input = "0x141ca95b6177615fb1417cf70e930e102bf8f584=1.41421";
    const result = parseRecipients(input, 18);

    expect(result).toHaveLength(1);
    expect(result[0].address).toBe("0x141ca95b6177615fb1417cf70e930e102bf8f584");
    expect(result[0].value).toBe(1414210000000000000n);
  });

  it("should parse multiple recipients on different lines", () => {
    const input = `0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 3.141592
0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a,2.7182
0x141ca95b6177615fb1417cf70e930e102bf8f584=1.41421`;

    const result = parseRecipients(input, 18);

    expect(result).toHaveLength(3);
    expect(result[0].value).toBe(3141592000000000000n);
    expect(result[1].value).toBe(2718200000000000000n);
    expect(result[2].value).toBe(1414210000000000000n);
  });

  it("should handle different decimal places", () => {
    const input = "0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 100";

    const result6Decimals = parseRecipients(input, 6);
    const result18Decimals = parseRecipients(input, 18);

    expect(result6Decimals[0].value).toBe(100000000n);
    expect(result18Decimals[0].value).toBe(100000000000000000000n);
  });

  it("should skip invalid lines", () => {
    const input = `0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 3.141592
invalid line
0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a,2.7182`;

    const result = parseRecipients(input, 18);

    expect(result).toHaveLength(2);
    expect(result[0].address).toBe("0x314ab97b76e39d63c78d5c86c2daf8eaa306b182");
    expect(result[1].address).toBe("0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a");
  });

  it("should handle empty input", () => {
    const result = parseRecipients("", 18);
    expect(result).toHaveLength(0);
  });

  it("should normalize addresses to lowercase", () => {
    const input = "0x314AB97B76E39D63C78D5C86C2DAF8EAA306B182 1";
    const result = parseRecipients(input, 18);

    expect(result[0].address).toBe("0x314ab97b76e39d63c78d5c86c2daf8eaa306b182");
  });
});

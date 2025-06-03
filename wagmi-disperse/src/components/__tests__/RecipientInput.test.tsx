import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useStore } from "../../store";
import { resetStore, setStoreState } from "../../test/mockStore";
import RecipientInput from "../RecipientInput";

describe("RecipientInput", () => {
  beforeEach(() => {
    resetStore();
  });

  afterEach(() => {
    resetStore();
  });

  it("should render with correct title and instructions", () => {
    setStoreState({ sending: "ether", token: {} });
    render(<RecipientInput />);

    expect(screen.getByText("recipients and amounts")).toBeInTheDocument();
    expect(screen.getByText(/enter one address and amount/)).toBeInTheDocument();
  });

  it("should display ETH symbol for ether sending", () => {
    setStoreState({ sending: "ether" });
    render(<RecipientInput />);

    expect(screen.getByText(/in ETH on each line/)).toBeInTheDocument();
  });

  it("should display token symbol when sending tokens", () => {
    setStoreState({ sending: "token", token: { symbol: "USDC", decimals: 6 } });
    render(<RecipientInput />);

    expect(screen.getByText(/in USDC on each line/)).toBeInTheDocument();
  });

  it("should display ??? when token symbol is missing", () => {
    setStoreState({ sending: "token", token: { decimals: 18 } });
    render(<RecipientInput />);

    expect(screen.getByText(/in \?\?\? on each line/)).toBeInTheDocument();
  });

  it("should update recipients in store when input changes", async () => {
    const user = userEvent.setup();
    setStoreState({ sending: "ether" });
    render(<RecipientInput />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 1");

    const { recipients } = useStore.getState();
    expect(recipients).toHaveLength(1);
    expect(recipients[0]).toEqual({
      address: "0x314ab97b76e39d63c78d5c86c2daf8eaa306b182",
      value: 1000000000000000000n,
    });
  });

  it("should parse multiple recipients", async () => {
    const user = userEvent.setup();
    setStoreState({ sending: "ether" });
    render(<RecipientInput />);

    const textarea = screen.getByRole("textbox");
    const input = `0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 1
0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a,2`;

    await user.clear(textarea);
    await user.type(textarea, input);

    const { recipients } = useStore.getState();
    expect(recipients).toHaveLength(2);
    expect(recipients[0]).toEqual({
      address: "0x314ab97b76e39d63c78d5c86c2daf8eaa306b182",
      value: 1000000000000000000n,
    });
    expect(recipients[1]).toEqual({
      address: "0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a",
      value: 2000000000000000000n,
    });
  });

  it("should handle different token decimals", async () => {
    const user = userEvent.setup();
    setStoreState({ sending: "token", token: { symbol: "USDC", decimals: 6 } });
    render(<RecipientInput />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 100");

    const { recipients } = useStore.getState();
    expect(recipients).toHaveLength(1);
    expect(recipients[0]).toEqual({
      address: "0x314ab97b76e39d63c78d5c86c2daf8eaa306b182",
      value: 100000000n, // 100 USDC with 6 decimals
    });
  });

  it("should have correct placeholder text", () => {
    render(<RecipientInput />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea.placeholder).toContain("0x314ab97b76e39d63c78d5c86c2daf8eaa306b182");
  });

  it("should have spellCheck disabled", () => {
    render(<RecipientInput />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea.getAttribute("spellcheck")).toBe("false");
  });
});

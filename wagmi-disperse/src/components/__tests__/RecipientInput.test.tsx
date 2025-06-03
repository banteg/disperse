import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RecipientInput from "../RecipientInput";

describe("RecipientInput", () => {
  const mockOnRecipientsChange = vi.fn();

  const defaultProps = {
    sending: "ether" as const,
    token: {},
    onRecipientsChange: mockOnRecipientsChange,
  };

  beforeEach(() => {
    mockOnRecipientsChange.mockClear();
  });

  it("should render with correct title and instructions", () => {
    render(<RecipientInput {...defaultProps} />);

    expect(screen.getByText("recipients and amounts")).toBeInTheDocument();
    expect(screen.getByText(/enter one address and amount/)).toBeInTheDocument();
  });

  it("should display ETH symbol for ether sending", () => {
    render(<RecipientInput {...defaultProps} />);

    expect(screen.getByText(/in ETH on each line/)).toBeInTheDocument();
  });

  it("should display token symbol when sending tokens", () => {
    render(<RecipientInput {...defaultProps} sending="token" token={{ symbol: "USDC", decimals: 6 }} />);

    expect(screen.getByText(/in USDC on each line/)).toBeInTheDocument();
  });

  it("should display ??? when token symbol is missing", () => {
    render(<RecipientInput {...defaultProps} sending="token" token={{ decimals: 18 }} />);

    expect(screen.getByText(/in \?\?\? on each line/)).toBeInTheDocument();
  });

  it("should call onRecipientsChange when input changes", async () => {
    const user = userEvent.setup();
    render(<RecipientInput {...defaultProps} />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 1");

    // Should be called multiple times (once per character typed)
    expect(mockOnRecipientsChange).toHaveBeenCalled();

    // Check the last call
    const lastCall = mockOnRecipientsChange.mock.calls[mockOnRecipientsChange.mock.calls.length - 1];
    expect(lastCall[0]).toHaveLength(1);
    expect(lastCall[0][0]).toEqual({
      address: "0x314ab97b76e39d63c78d5c86c2daf8eaa306b182",
      value: 1000000000000000000n,
    });
  });

  it("should parse multiple recipients", async () => {
    const user = userEvent.setup();
    render(<RecipientInput {...defaultProps} />);

    const textarea = screen.getByRole("textbox");
    const input = `0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 1
0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a,2`;

    await user.clear(textarea);
    await user.type(textarea, input);

    const lastCall = mockOnRecipientsChange.mock.calls[mockOnRecipientsChange.mock.calls.length - 1];
    expect(lastCall[0]).toHaveLength(2);
    expect(lastCall[0][0].value).toBe(1000000000000000000n);
    expect(lastCall[0][1].value).toBe(2000000000000000000n);
  });

  it("should handle different token decimals", async () => {
    const user = userEvent.setup();
    render(<RecipientInput {...defaultProps} sending="token" token={{ symbol: "USDC", decimals: 6 }} />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 100");

    const lastCall = mockOnRecipientsChange.mock.calls[mockOnRecipientsChange.mock.calls.length - 1];
    expect(lastCall[0][0].value).toBe(100000000n); // 100 * 10^6
  });

  it("should have correct placeholder text", () => {
    render(<RecipientInput {...defaultProps} />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea.placeholder).toContain("0x314ab97b76e39d63c78d5c86c2daf8eaa306b182");
  });

  it("should have spellCheck disabled", () => {
    render(<RecipientInput {...defaultProps} />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea.getAttribute("spellcheck")).toBe("false");
  });
});

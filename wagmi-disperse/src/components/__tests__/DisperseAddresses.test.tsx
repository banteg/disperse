import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { mockRecipients } from "../../test/utils";
import DisperseAddresses from "../DisperseAddresses";

describe("DisperseAddresses", () => {
  const defaultProps = {
    recipients: mockRecipients,
    symbol: "ETH",
    decimals: 18,
    balance: 10000000000000000000n, // 10 ETH
    left: 4140208000000000000n, // ~4.14 ETH
    total: 5859792000000000000n, // ~5.86 ETH
  };

  it("should render recipient addresses and amounts", () => {
    render(<DisperseAddresses {...defaultProps} />);

    // Check addresses are displayed (full addresses)
    expect(screen.getByText("0x314ab97b76e39d63c78d5c86c2daf8eaa306b182")).toBeInTheDocument();
    expect(screen.getByText("0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a")).toBeInTheDocument();

    // Check amounts are displayed (3.141592 and 2.7182)
    expect(screen.getByText("3.141592")).toBeInTheDocument();
    expect(screen.getByText("2.7182")).toBeInTheDocument();
  });

  it("should display total amount", () => {
    render(<DisperseAddresses {...defaultProps} />);

    expect(screen.getByText("total")).toBeInTheDocument();
    expect(screen.getByText("5.859792")).toBeInTheDocument();
  });

  it("should display balance", () => {
    render(<DisperseAddresses {...defaultProps} />);

    expect(screen.getByText("your balance")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("should display remaining amount", () => {
    render(<DisperseAddresses {...defaultProps} />);

    expect(screen.getByText("remaining")).toBeInTheDocument();
    expect(screen.getByText("4.140208")).toBeInTheDocument();
  });

  it("should highlight negative remaining balance", () => {
    const { container } = render(
      <DisperseAddresses
        {...defaultProps}
        balance={1000000000000000000n} // 1 ETH
        left={-4859792000000000000n} // negative
      />,
    );

    // Check for the negative class on the flex container
    const remainingElement = container.querySelector(".flex.fade.negative");
    expect(remainingElement).toBeInTheDocument();
  });

  it("should display correct symbol", () => {
    const { container } = render(<DisperseAddresses {...defaultProps} symbol="USDC" />);

    const symbolElements = container.querySelectorAll(".sc");
    expect(symbolElements).toHaveLength(5); // 2 recipients + total + balance + remaining
    for (const el of Array.from(symbolElements)) {
      expect(el.textContent).toBe("USDC");
    }
  });

  it("should handle different decimals correctly", () => {
    render(
      <DisperseAddresses
        {...defaultProps}
        decimals={6}
        recipients={[
          {
            address: "0x314ab97b76e39d63c78d5c86c2daf8eaa306b182" as `0x${string}`,
            value: 1000000n, // 1 token with 6 decimals
          },
        ]}
        total={1000000n}
      />,
    );

    // Get all elements with text "1"
    const elements = screen.getAllByText("1");
    // Should have 2 elements: one for recipient amount, one for total
    expect(elements).toHaveLength(2);
  });

  it("should handle empty recipients list", () => {
    render(<DisperseAddresses {...defaultProps} recipients={[]} total={0n} />);

    expect(screen.getByText("total")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});

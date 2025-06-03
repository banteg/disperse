import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BaseError } from "viem";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TokenLoader from "../TokenLoader";

// Mock wagmi hooks
vi.mock("wagmi", () => ({
  useReadContract: vi.fn(),
  useConfig: vi.fn(() => ({ chains: [] })),
}));

// Mock console.log to avoid noise in tests
vi.spyOn(console, "log").mockImplementation(() => {});

import { useReadContract } from "wagmi";
const mockUseReadContract = vi.mocked(useReadContract);

describe("TokenLoader", () => {
  const mockOnSelect = vi.fn();
  const mockOnError = vi.fn();

  const defaultProps = {
    onSelect: mockOnSelect,
    onError: mockOnError,
    chainId: 1,
    account: "0x1234567890123456789012345678901234567890" as `0x${string}`,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReadContract.mockReturnValue({
      data: undefined,
      isError: false,
      error: null,
    } as any);
  });

  it("should render token input form", () => {
    render(<TokenLoader {...defaultProps} />);

    expect(screen.getByText("token address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359")).toBeInTheDocument();
    expect(screen.getByDisplayValue("load")).toBeInTheDocument();
  });

  it("should handle valid token address submission", async () => {
    const user = userEvent.setup();

    // Mock successful token data loading
    mockUseReadContract
      .mockReturnValueOnce({ data: "Test Token", isError: false, error: null } as any) // name
      .mockReturnValueOnce({ data: "TEST", isError: false, error: null } as any) // symbol
      .mockReturnValueOnce({ data: 18n, isError: false, error: null } as any) // decimals
      .mockReturnValueOnce({ data: 1000000n, isError: false, error: null } as any) // balance
      .mockReturnValueOnce({ data: 500000n, isError: false, error: null } as any); // allowance

    render(<TokenLoader {...defaultProps} />);

    const input = screen.getByPlaceholderText("0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359");
    const loadButton = screen.getByDisplayValue("load");

    await user.type(input, "0x6B175474E89094C44Da98b954EedeAC495271d0F");
    await user.click(loadButton);

    expect(screen.getByText("loading token data...")).toBeInTheDocument();
  });

  it("should show error for invalid token address", async () => {
    const user = userEvent.setup();
    render(<TokenLoader {...defaultProps} />);

    const input = screen.getByPlaceholderText("0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359");
    const loadButton = screen.getByDisplayValue("load");

    await user.type(input, "not-a-valid-address");
    await user.click(loadButton);

    expect(screen.getByText("invalid token address")).toBeInTheDocument();
  });

  it("should show error when wallet not connected", async () => {
    const user = userEvent.setup();
    render(<TokenLoader {...defaultProps} account={undefined} />);

    const input = screen.getByPlaceholderText("0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359");
    const loadButton = screen.getByDisplayValue("load");

    await user.type(input, "0x6B175474E89094C44Da98b954EedeAC495271d0F");
    await user.click(loadButton);

    expect(screen.getByText("wallet not connected")).toBeInTheDocument();
  });

  it("should initialize with token address from props", () => {
    const tokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    render(<TokenLoader {...defaultProps} token={{ address: tokenAddress as `0x${string}` }} />);

    const input = screen.getByPlaceholderText("0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359") as HTMLInputElement;
    expect(input.value).toBe(tokenAddress);
  });

  it("should handle token loading errors", async () => {
    const user = userEvent.setup();

    // Mock error in token data loading
    mockUseReadContract.mockReturnValue({
      data: undefined,
      isError: true,
      error: new BaseError("Contract read failed", {
        cause: new Error("Network error"),
      }),
    } as any);

    render(<TokenLoader {...defaultProps} />);

    const input = screen.getByPlaceholderText("0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359");
    const loadButton = screen.getByDisplayValue("load");

    await user.type(input, "0x6B175474E89094C44Da98b954EedeAC495271d0F");
    await user.click(loadButton);

    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalled();
    });
  });

  it("should handle successful token data loading", async () => {
    const user = userEvent.setup();

    // Initially return no data
    mockUseReadContract.mockReturnValue({ data: undefined, isError: false, error: null } as any);

    const { rerender } = render(<TokenLoader {...defaultProps} />);

    const input = screen.getByPlaceholderText("0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359");
    const loadButton = screen.getByDisplayValue("load");

    await user.type(input, "0x6B175474E89094C44Da98b954EedeAC495271d0F");
    await user.click(loadButton);

    // Now mock successful data return for all calls
    mockUseReadContract
      .mockReturnValueOnce({ data: "Test Token", isError: false, error: null } as any) // name
      .mockReturnValueOnce({ data: "TEST", isError: false, error: null } as any) // symbol
      .mockReturnValueOnce({ data: 18n, isError: false, error: null } as any) // decimals
      .mockReturnValueOnce({ data: 1000000n, isError: false, error: null } as any) // balance
      .mockReturnValueOnce({ data: 500000n, isError: false, error: null } as any); // allowance

    // Force re-render to trigger effect with new data
    rerender(<TokenLoader {...defaultProps} />);

    await waitFor(() => {
      expect(mockOnSelect).toHaveBeenCalledWith({
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        name: "Test Token",
        symbol: "TEST",
        decimals: 18,
        balance: 1000000n,
        allowance: 500000n,
      });
    });
  });

  it("should disable input and button while loading", async () => {
    const user = userEvent.setup();
    render(<TokenLoader {...defaultProps} />);

    const input = screen.getByPlaceholderText("0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359");
    const loadButton = screen.getByDisplayValue("load");

    await user.type(input, "0x6B175474E89094C44Da98b954EedeAC495271d0F");
    await user.click(loadButton);

    expect(input).toBeDisabled();
    expect(loadButton).toBeDisabled();
  });

  it("should clear error message when input changes", async () => {
    const user = userEvent.setup();
    render(<TokenLoader {...defaultProps} />);

    const input = screen.getByPlaceholderText("0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359");
    const loadButton = screen.getByDisplayValue("load");

    // First submit invalid address
    await user.type(input, "invalid");
    await user.click(loadButton);
    expect(screen.getByText("invalid token address")).toBeInTheDocument();

    // Then type valid address
    await user.clear(input);
    await user.type(input, "0x6B175474E89094C44Da98b954EedeAC495271d0F");

    expect(screen.queryByText("invalid token address")).not.toBeInTheDocument();
  });

  it("should handle error with shortMessage", async () => {
    const user = userEvent.setup();

    const errorWithShortMessage = new BaseError("Full error message");
    errorWithShortMessage.shortMessage = "Token not found";

    mockUseReadContract.mockReturnValue({
      data: undefined,
      isError: true,
      error: errorWithShortMessage,
    } as any);

    render(<TokenLoader {...defaultProps} />);

    const input = screen.getByPlaceholderText("0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359");
    const loadButton = screen.getByDisplayValue("load");

    await user.type(input, "0x6B175474E89094C44Da98b954EedeAC495271d0F");
    await user.click(loadButton);

    await waitFor(() => {
      expect(screen.getByText("Token not found")).toBeInTheDocument();
    });
  });

  it("should use custom contract address when provided", async () => {
    const customContractAddress = "0xD152f549545093347A162Dce210e7293f1452150";
    render(<TokenLoader {...defaultProps} contractAddress={customContractAddress as `0x${string}`} />);

    // The component should use the custom address for allowance checks
    expect(mockUseReadContract).toHaveBeenCalledWith(
      expect.objectContaining({
        functionName: "allowance",
        args: [defaultProps.account, customContractAddress],
      }),
    );
  });
});

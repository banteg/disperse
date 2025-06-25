

import { test, expect } from '@playwright/test';
import { createPublicClient, http, parseEther } from 'viem';
import { foundry } from 'viem/chains';
import { promises as fs } from 'fs';
import path from 'path';

const publicClient = createPublicClient({
  chain: foundry,
  transport: http('http://127.0.0.1:8545'),
});

const erc20Abi = [
  {
    "constant": true,
    "inputs": [{ "name": "_owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "balance", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
];

let tokenAddress: `0x${string}`;

test.beforeAll(async () => {
  const configPath = path.join(__dirname, 'test-config.json');
  const config = JSON.parse(await fs.readFile(configPath, 'utf-8'));
  tokenAddress = config.tokenAddress;
});

test.describe('Disperse App', () => {
  test('should disperse ETH to multiple recipients', async ({ page }) => {
    await page.goto('http://localhost:5173'); // Default Vite port

    // This test assumes the wallet is already connected through Playwright's context

    await page.click('input[value="ether"]');

    const recipients = [
      { address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8', amount: '1' },
      { address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', amount: '2' },
    ];
    const recipientInput = await page.locator('textarea');
    await recipientInput.fill(recipients.map(r => `${r.address},${r.amount}`).join('\n'));

    const initialBalance1 = await publicClient.getBalance({ address: recipients[0].address });
    const initialBalance2 = await publicClient.getBalance({ address: recipients[1].address });

    await page.click('input[value="Disperse Ether"]');

    // Wait for confirmation
    await page.waitForSelector('text=Transaction confirmed');

    const finalBalance1 = await publicClient.getBalance({ address: recipients[0].address });
    const finalBalance2 = await publicClient.getBalance({ address: recipients[1].address });

    expect(finalBalance1).toBe(initialBalance1 + parseEther('1'));
    expect(finalBalance2).toBe(initialBalance2 + parseEther('2'));
  });

  test('should disperse ERC20 tokens to multiple recipients', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await page.click('input[value="token"]');

    await page.locator('input[type="search"]').fill(tokenAddress);
    await page.click('input[value="Load Token"]');

    const recipients = [
      { address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8', amount: '100' },
      { address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', amount: '200' },
    ];
    const recipientInput = await page.locator('textarea');
    await recipientInput.fill(recipients.map(r => `${r.address},${r.amount}`).join('\n'));

    const initialBalance1 = await publicClient.readContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [recipients[0].address]
    });

    const initialBalance2 = await publicClient.readContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [recipients[1].address]
    });

    await page.click('input[value="Approve"]');
    await page.waitForSelector('text=Approve transaction confirmed');
    await page.click('input[value="Disperse Tokens"]');
    await page.waitForSelector('text=Transaction confirmed');

    const finalBalance1 = await publicClient.readContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [recipients[0].address]
    });

    const finalBalance2 = await publicClient.readContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [recipients[1].address]
    });

    expect(finalBalance1).toBe(initialBalance1 + parseEther('100'));
    expect(finalBalance2).toBe(initialBalance2 + parseEther('200'));
  });
});

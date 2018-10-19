import pytest
import json
from eth_tester import EthereumTester
from web3 import Web3, EthereumTesterProvider
from web3.contract import ConciseContract


class BalanceTracker:
    def __init__(self, addresses):
        self.addresses = addresses
        self.before = self.get_balances()

    def get_balances(self):
        return [self.get_balance(addr) for addr in self.addresses]

    def diff(self):
        self.after = self.get_balances()
        return [a - b for b, a in zip(self.before, self.after)]


class EtherBalanceTracker(BalanceTracker):
    def __init__(self, w3, addresses):
        self.w3 = w3
        super().__init__(addresses)
    
    def get_balance(self, address):
        return self.w3.eth.getBalance(address)


class TokenBalanceTracker(BalanceTracker):
    def __init__(self, token, addresses):
        self.token = token
        super().__init__(addresses)

    def get_balance(self, address):
        return self.token.balanceOf(address)


@pytest.fixture
def ether_balances(w3, sender, recipients):
    return EtherBalanceTracker(w3, [sender] + recipients)


@pytest.fixture
def token_balances(token, sender, recipients):
    return TokenBalanceTracker(token, [sender] + recipients)


def deploy(artifact, w3):
    with open(f'artifacts/truffle/{artifact}.json') as f:
        data = json.load(f)
    Contract = w3.eth.contract(abi=data['abi'], bytecode=data['bytecode'])
    tx_hash = Contract.constructor().transact()
    receipt = w3.eth.getTransactionReceipt(tx_hash)
    return ConciseContract(w3.eth.contract(receipt.contractAddress, abi=data['abi']))


@pytest.fixture(scope='session')
def w3():
    web3 = Web3(EthereumTesterProvider())
    web3.eth.defaultAccount = web3.eth.accounts[0]
    return web3


@pytest.fixture(scope='session')
def disperse(w3):
    return deploy('Disperse', w3)


@pytest.fixture
def token(w3):
    return deploy('TestToken', w3)


@pytest.fixture
def sender(w3):
    return w3.eth.accounts[0]


@pytest.fixture
def recipients(w3):
    return [w3.eth.account.create().address for i in range(3)]


@pytest.fixture
def values(w3):
    return [w3.toWei(i, 'ether') for i in range(3)]

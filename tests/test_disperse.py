import pytest
from eth_tester.exceptions import TransactionFailed


def test_disperse_ether(w3, disperse, recipients, values, ether_balances):
    tx = disperse.disperseEther(recipients, values, transact={'value': sum(values)})
    receipt = w3.eth.getTransactionReceipt(tx)
    assert ether_balances.diff() == [-sum(values) - receipt.gasUsed] + values, 'balances mismatch'


def test_disperse_ether_rejects(w3, disperse, recipients, values):
    with pytest.raises(TransactionFailed, message='not enough values'):
        disperse.disperseEther(recipients, values[:-1], transact={'value': sum(values)})

    with pytest.raises(TransactionFailed, message='not enough ether sent along with transaction'):
        disperse.disperseEther(recipients, values, transact={'value': sum(values) // 2})


@pytest.mark.parametrize('func', ['disperseToken', 'disperseTokenSimple'])
def test_disperse_token(w3, sender, disperse, token, recipients, values, token_balances, func):
    token.approve(disperse.address, sum(values), transact={})
    assert token.allowance(sender, disperse.address) == sum(values), 'allowance not set'

    getattr(disperse, func)(token.address, recipients, values, transact={})
    assert token_balances.diff() == [-sum(values)] + values, 'token balances mismatch'


@pytest.mark.parametrize('func', ['disperseToken', 'disperseTokenSimple'])
def test_disperse_token_rejects(w3, sender, disperse, token, recipients, values, func):
    with pytest.raises(TransactionFailed, message='allowance not set'):
        getattr(disperse, func)(token.address, recipients, values, transact={})
    
    allowance = 2 ** 256 - 1
    token.approve(disperse.address, allowance, transact={})
    assert token.allowance(sender, disperse.address) == allowance, 'allowance not set'
    
    with pytest.raises(TransactionFailed, message='not enough values'):
        getattr(disperse, func)(token.address, recipients, values[:-1], transact={})
    
    with pytest.raises(TransactionFailed, message='externally owned account passed as token address'):
        getattr(disperse, func)(recipients[0], recipients, values, transact={})

    with pytest.raises(TransactionFailed, message='non-compliant contract passed as token address'):
        getattr(disperse, func)(disperse.address, recipients, values, transact={})

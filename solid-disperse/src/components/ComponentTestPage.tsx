
import { createSignal } from 'solid-js';
import ChainSelector from './ChainSelector';
import CurrencySelector from './CurrencySelector';
import DisperseAddresses from './DisperseAddresses';
import Footer from './Footer';
import Header from './Header';
import NetworkStatus from './NetworkStatus';
import RecipientInput from './RecipientInput';
import TokenLoader from './TokenLoader';
import TransactionButton from './TransactionButton';
import TransactionSection from './TransactionSection';
import type { Recipient } from '../types';

const ComponentTestPage = () => {
  const [recipients, setRecipients] = createSignal<Recipient[]>([]);
  const [sending, setSending] = createSignal<'ether' | 'token'>('ether');

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Component Test Page</h1>
      
      <section style={{ margin: '2rem 0' }}>
        <h2>Header</h2>
        <Header onConnect={() => {}} />
      </section>

      <section style={{ margin: '2rem 0' }}>
        <h2>Footer</h2>
        <Footer chainId={1} />
      </section>
      
      <section style={{ margin: '2rem 0' }}>
        <h2>Chain Selector</h2>
        <ChainSelector onConnect={() => {}} />
      </section>
      
      <section style={{ margin: '2rem 0' }}>
        <h2>Currency Selector</h2>
        <CurrencySelector onSelect={setSending} />
        <p>Selected: {sending()}</p>
      </section>

      <section style={{ margin: '2rem 0' }}>
        <h2>Recipient Input</h2>
        <RecipientInput sending={sending()} token={undefined} onRecipientsChange={setRecipients} />
      </section>

      <section style={{ margin: '2rem 0' }}>
        <h2>Disperse Addresses</h2>
        <DisperseAddresses 
          recipients={recipients()} 
          symbol={"ETH"}
          decimals={18}
          balance={1000000000000000000n}
          left={1000000000000000000n}
          total={0n}
        />
      </section>

      <section style={{ margin: '2rem 0' }}>
        <h2>Token Loader</h2>
        <TokenLoader 
          onSelect={() => {}} 
          onError={() => {}} 
          chainId={1} 
          account={"0x0"} 
          token={undefined} 
          contractAddress={"0x0"} 
        />
      </section>

      <section style={{ margin: '2rem 0' }}>
        <h2>Transaction Button</h2>
        <TransactionButton show={true} action={"approve"} />
      </section>

      <section style={{ margin: '2rem 0' }}>
        <h2>Transaction Section</h2>
        <TransactionSection 
          sending={sending()}
          recipients={recipients()}
          token={undefined}
          symbol={"ETH"}
          decimals={18}
          balance={1000000000000000000n}
          leftAmount={1000000000000000000n}
          totalAmount={0n}
          disperseMessage={""}
          chainId={1}
          verifiedAddress={"0x0"}
          account={"0x0"}
          nativeCurrencyName={"ETH"}
          effectiveAllowance={0n}
          onTransactionSuccess={() => {}}
        />
      </section>

      <section style={{ margin: '2rem 0' }}>
        <h2>Network Status</h2>
        <NetworkStatus 
            chainId={1}
            isBytecodeLoading={false}
            isContractDeployed={true}
            isConnected={true}
            verifiedAddress={{ address: "0x123", label: "Test Contract" }}
        />
      </section>

    </div>
  );
};

export default ComponentTestPage;

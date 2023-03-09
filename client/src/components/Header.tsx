import { AppBar,Container, Toolbar } from "@mui/material"
import { SBox,FlexRow,MainText } from "../theme/theme"

import React, { FC, useMemo,ReactNode } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import {
    GlowWalletAdapter,
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,

} from '@solana/wallet-adapter-wallets';
import { Buffer } from 'buffer';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

// import { SolanaWallets } from "glitter-bridge-sdk-dev/dist";



const Header: FC = () => {
  
   // @ts-ignore
window.Buffer = Buffer;

    return (
        <Context>
            <Content />
        </Context>
    );
};

export default Header;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Mainnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            // solana.connectToPhantomWallet(),
            // solana.connectToSolfareWallet()
            new LedgerWalletAdapter(),
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolletExtensionWalletAdapter(), 
            new SolletWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
        ],
        [network]
    );
   
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};



 const Content: FC = () => {
    return(
<AppBar position='static' sx={{backgroundColor:'transparent'}} >
<Container maxWidth='xl'>
<Toolbar disableGutters>
<FlexRow className="header">
<MainText className='Head'></MainText>
<WalletMultiButton/>
</FlexRow>
</Toolbar>
</Container>
</AppBar>
    )
}

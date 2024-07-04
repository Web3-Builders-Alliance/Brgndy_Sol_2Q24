import 'tailwindcss/tailwind.css'
import React, { ReactNode } from 'react'; // Import React explicitly
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';

const WalletConnectionProvider = dynamic<{ children: ReactNode }>(
    () =>
        import("../components/SolanaWallet").then(
            ({ SolanaWallet }) => SolanaWallet
        ),
    {
        ssr: false,
    }
);

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <WalletConnectionProvider>
            <Header />
            <Component {...pageProps} />
        </WalletConnectionProvider>
    )
}

export default MyApp
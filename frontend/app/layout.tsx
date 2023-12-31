'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'

// require('@solana/wallet-adapter-react-ui/styles.css')
import '@solana/wallet-adapter-react-ui/styles.css'
import { clusterApiUrl } from '@solana/web3.js'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // const endpoint = 'http://localhost:8899'
  const endpoint = clusterApiUrl('devnet')

  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter()
  ]

  return (
    <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <html lang="en">
                <body className={inter.className}>{children}</body>
              </html>
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
  )
}

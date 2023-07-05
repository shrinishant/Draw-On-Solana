"use client"

import ColorSelector from "@/components/ColorSelector"
import Title from "@/components/Title"
import { Color, colors } from "@/lib/colors"
import { useState, useMemo } from "react"
import Canvas from "@/components/Canvas"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { AnchorWallet, useAnchorWallet, useConnection } from "@solana/wallet-adapter-react"
import { AnchorProvider, Program } from "@project-serum/anchor"
import {SolanaPrograms, IDL} from "../idl/drawOnSolana"
import { PublicKey, clusterApiUrl } from "@solana/web3.js"
import '@solana/wallet-adapter-react-ui/styles.css'
import NoSsr from "@/components/NoSsr"

export default function Home() {
  const [selectedColor, setSelectedColor] = useState<Color>(colors[0])

  const {connection} = useConnection()

  const anchorWallet: AnchorWallet | undefined = useAnchorWallet()

  const anchorProvider: AnchorProvider | undefined = useMemo(() => {
    if(anchorWallet){
      return new AnchorProvider(connection, anchorWallet, {commitment: 'confirmed'})
    }else{
      return undefined
    }
  }, [connection, anchorWallet])

  const programId = new PublicKey("AZG9qbzncQcjtb5FZfEqmefHRwGGUJRqpptT1dB3Lci7")

  const anchorProgram: Program<SolanaPrograms> | undefined = useMemo(() => {
    if(anchorProvider) {
      return new Program(IDL, programId, anchorProvider)
    }else {
      return undefined
    }
  }, [anchorProvider])

  return (
    <>
      <div className="flex flex-col items-stretch gap-8 px-4 pt-24 mx-auto max-w-max">
      <main className="flex flex-col gap-4">
        <Title>Draw On Solana</Title>
        <div className="basis-1/4">
          <NoSsr>
            <WalletMultiButton className='!bg-gray-900 hover:scale-105' />
          </NoSsr>
        </div>
        <ColorSelector selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        <Canvas program={anchorProgram} />
      </main>
    </div>
    </>
  )
}
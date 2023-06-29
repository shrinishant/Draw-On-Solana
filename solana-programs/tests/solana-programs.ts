import * as anchor from "@project-serum/anchor";
import { Program, web3 } from "@project-serum/anchor";
import { SolanaPrograms } from "../target/types/solana_programs";
import {assert} from "chai"

// move razor insane juice cage girl rubber upper during electric fetch disorder

describe("solana-programs", () => {
  // Configure the client to use the local cluster.
  const anchorProvider = anchor.AnchorProvider.env();
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaPrograms as Program<SolanaPrograms>;

  it("Can create a pixel", async () => {
    const pixelKeyPair = web3.Keypair.generate()

    await program.methods.createPixel(10, 10, 0, 0, 255)
            .accounts({
              pixel: pixelKeyPair.publicKey,
              user: anchorProvider.wallet.publicKey,
              systemProgram: web3.SystemProgram.programId
            })
            .signers([pixelKeyPair])
            .rpc()

    const storedPixel = await program.account.pixel.fetch(pixelKeyPair.publicKey)
    assert.equal(storedPixel.posX, 10)
    assert.equal(storedPixel.posY, 10)
    assert.equal(storedPixel.colR, 0)
    assert.equal(storedPixel.colG, 0)
    assert.equal(storedPixel.colB, 255)
  })
});

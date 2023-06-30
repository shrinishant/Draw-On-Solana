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

  it("Does not allow creating a pixel out of bounds", async () => {
    const pixelKeyPair = web3.Keypair.generate()

    await program.methods.createPixel(0, 200, 0, 0, 255)
            .accounts({
              pixel: pixelKeyPair.publicKey,
              user: anchorProvider.wallet.publicKey,
              systemProgram: web3.SystemProgram.programId
            })
            .signers([pixelKeyPair])
            .rpc()
            .then(() => Promise.reject(new Error('Expected to error'))),
            (e: anchor.AnchorError) => {
              assert.ok(e.errorLogs.some(log => log.includes('InvalidYCoordinate')
               && log.includes('The given Y co-ordinate is not between 0-99')))
            }
  })

  it("Does not allow creating the same pixel twice", async () => {
    const x = 20;
    const y = 20;

    const pixelKeyPair1 = web3.Keypair.generate()

    // ye pass hona chahiye
    await program.methods.createPixel(x, y, 0, 0, 255)
            .accounts({
              pixel: pixelKeyPair1.publicKey,
              user: anchorProvider.wallet.publicKey,
              systemProgram: web3.SystemProgram.programId
            })
            .signers([pixelKeyPair1])
            .rpc()

    const pixelKeyPair2 = web3.Keypair.generate()

    // ye fail hona chahiye
    await program.methods.createPixel(x, y, 0, 0, 255)
            .accounts({
              pixel: pixelKeyPair2.publicKey,
              user: anchorProvider.wallet.publicKey,
              systemProgram: web3.SystemProgram.programId
            })
            .signers([pixelKeyPair2])
            .postInstructions([
              web3.SystemProgram.transfer({
                fromPubkey: anchorProvider.wallet.publicKey,
                toPubkey: anchorProvider.wallet.publicKey,
                lamports: 1
              })
            ])
            .rpc()
            .then(
              () => Promise.reject(new Error('Expected to error!')),
              (e: web3.SendTransactionError) => {
                console.error(e.logs)
              }
            )
  })
});

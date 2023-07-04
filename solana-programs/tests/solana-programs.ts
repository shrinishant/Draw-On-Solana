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

    const x = 13
    const y = 13

    const [pixelPublicKey] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("pixel"), Buffer.from([x, y])],
      program.programId
    )

    await program.methods.createPixel(x, y, 0, 0, 255)
            .accounts({
              //earlier before PDA, we've been generating random public key
              pixel: pixelPublicKey,
              user: anchorProvider.wallet.publicKey,
              systemProgram: web3.SystemProgram.programId
            })
            .rpc()
            .then(() => console.log("created pixel with x: 10"),
              (e: any) => console.log(e)
            )

    const storedPixel = await program.account.pixel.fetch(pixelPublicKey)
    console.log("first going good", storedPixel)
    assert.equal(storedPixel.posX, x)
    assert.equal(storedPixel.posY, y)
    assert.equal(storedPixel.colR, 0)
    assert.equal(storedPixel.colG, 0)
    assert.equal(storedPixel.colB, 255)
  })

  it("Does not allow creating a pixel out of bounds", async () => {
    const x = 0
    const y = 200

    const [pixelPublicKey] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("pixel"), Buffer.from([x, y])],
      program.programId
    )

    program.methods.createPixel(x, y, 0, 0, 255)
            .accounts({
              pixel: pixelPublicKey,
              user: anchorProvider.wallet.publicKey,
              systemProgram: web3.SystemProgram.programId
            })
            .rpc()
            .then(() => Promise.reject(new Error('Expected to error')),
            (e: anchor.AnchorError) => {
              assert.ok(e.errorLogs.some(log => log.includes('InvalidYCoordinate')
               && log.includes('The given Y co-ordinate is not between 0-99')))
            })
  })

  it("Does not allow creating the same pixel twice", async () => {
    const x = 10;
    const y = 10;

    const [pixelPublicKey] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("pixel"), Buffer.from([x, y])],
      program.programId
    )

    program.methods.createPixel(x, y, 0, 0, 255)
            .accounts({
              pixel: pixelPublicKey,
              user: anchorProvider.wallet.publicKey,
              systemProgram: web3.SystemProgram.programId
            })
            .rpc()
            .then(
              () => Promise.reject(new Error('Expected to error!')),
              (e: web3.SendTransactionError) => {
                console.log("iniside error already in use")
                assert.ok(e.logs.some(log => log.includes(pixelPublicKey.toBase58()) && log.includes("Already in Use")))
              }
            )
            
  })

  it("Does not allow passing an incorrect address",async () => {
    //Generating PDA for (0, 0)
    const [pixelPublicKey] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("pixel"), Buffer.from([0, 0])],
      program.programId
    )

    // Now attempt to use it to create for (30, 30)
    await program.methods.createPixel(30, 30, 0, 0, 255)
          .accounts({
            pixel: pixelPublicKey,
            user: anchorProvider.wallet.publicKey,
            systemProgram: web3.SystemProgram.programId
          })
          .rpc()
          .then(
            () => Promise.reject(new Error("Expected to error!")),
            (e: web3.SendTransactionError) => {
              const expectedError = `${pixelPublicKey.toBase58()}'s signer privilege escalated`
              console.log("not passing inco address 53")
              assert.ok(e.logs.some(log => log === expectedError))
            }
          )

  })

  it("Can update a created Pixel", async () => {
    const x = 55
    const y = 55

    const [pixelPublicKey] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from('pixel'), Buffer.from([x, y])],
      program.programId
    )

    await program.methods.createPixel(x, y, 0, 0, 255)
      .accounts({
        pixel: pixelPublicKey,
        user: anchorProvider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId
      })
      .rpc()

      console.log("update transaction going goog")
      const storedPixelX = await program.account.pixel.fetch(pixelPublicKey)
      console.log(storedPixelX)

    await program.methods.updatePixel(255, 0, 0)
          .accounts({
            pixel: pixelPublicKey
          })
          .rpc()

    const storedPixel = await program.account.pixel.fetch(pixelPublicKey)
    assert.equal(storedPixel.posX, x)
    assert.equal(storedPixel.posY, y)
    assert.equal(storedPixel.colR, 255)
    assert.equal(storedPixel.colG, 0)
    assert.equal(storedPixel.colB, 0)
  })

  it("Emits an event when a pixel is created", async () => {
    let events = []
    const listener = program.addEventListener('PixelChanged', (event: any) => {
      events.push(event)
    })

    const x = 57
    const y = 57

    const [pixelPublicKey] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("pixel"), Buffer.from([x, y])],
      program.programId
    )

    await program.methods.createPixel(x, y, 0, 0, 255)
          .accounts({
            pixel: pixelPublicKey,
            user: anchorProvider.wallet.publicKey,
            systemProgram: web3.SystemProgram.programId
          })
          .rpc()
          .then(() => console.log("successfull emit event"),
          (e) => {
            console.log(e, "not successfully emit event")
          })

    assert.equal(events.length, 1)
    const event = events[0]

    assert.equal(event.posX, x)
    assert.equal(event.posY, y)
    assert.equal(event.colR, 0)
    assert.equal(event.colG, 0)
    assert.equal(event.colB, 255)

    program.removeEventListener(listener)
  })

  it("Emits an event when a pixel is updated", async () => {
    let events = []
    const listener = program.addEventListener('PixelChanged', (event: any) => {
      events.push(event)
    })

    const x = 57
    const y = 57

    const [pixelPublicKey] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("pixel"), Buffer.from([x, y])],
      program.programId
    )

    await program.methods.updatePixel(255, 0, 0)
          .accounts({
            pixel: pixelPublicKey
          })
          .rpc()

    assert.equal(events.length, 1)
    const event = events[0]

    assert.equal(event.posX, x)
    assert.equal(event.posY, y)
    assert.equal(event.colR, 255)
    assert.equal(event.colG, 0)
    assert.equal(event.colB, 0)

    program.removeEventListener(listener)
  })
});

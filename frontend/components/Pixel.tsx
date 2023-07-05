import { Program } from "@project-serum/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { SolanaPrograms } from "@/idl/drawOnSolana"

interface Props {
    posX: number,
    posY: number,
    program: Program<SolanaPrograms> | undefined
}

export default function Pixel({ posX, posY, program }: Props) {
    const color = "white"

    const getPixelAddress = () => {
        if(program !== undefined){
          const [pixelPublicKey] = PublicKey.findProgramAddressSync(
            [Buffer.from("pixel"), Buffer.from([posX, posY])],
            program.programId,
          )
          return pixelPublicKey
        }
      }
    
      const createPixel = async () => {
        if(program !== undefined){
          console.log({
            pixel: getPixelAddress(),
            user: program.provider.publicKey,
            systemProgram: SystemProgram.programId,
          }, "nishant")
          await program.methods
            .createPixel(posX, posY, 255, 0, 0)
            .accounts({
              pixel: getPixelAddress(),
              user: program.provider.publicKey,
              systemProgram: SystemProgram.programId,
            })
            .rpc();
        }
      }

    return (
        <td
            className="h-4 min-w-[1rem]"
            style={{backgroundColor: color}}
            onClick={createPixel}
        />
    )
}
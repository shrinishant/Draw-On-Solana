import { Program, IdlAccounts } from "@project-serum/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { SolanaPrograms } from "@/idl/drawOnSolana"

type PixelAccount = IdlAccounts<SolanaPrograms>['pixel']

interface Props {
    posX: number,
    posY: number,
    program: Program<SolanaPrograms> | undefined
    pixelData?: PixelAccount
}

export default function Pixel({ posX, posY, program, pixelData }: Props) {
    const {colR, colG, colB} = pixelData || {}
    const color = pixelData ? `rgb(${colR}, ${colG}, ${colB})` : 'white'

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
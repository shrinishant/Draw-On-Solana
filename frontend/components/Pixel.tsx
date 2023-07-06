import { Program, IdlAccounts } from "@project-serum/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { SolanaPrograms } from "@/idl/drawOnSolana"
import { Color } from "@/lib/colors"

type PixelAccount = IdlAccounts<SolanaPrograms>['pixel']

interface Props {
    posX: number,
    posY: number,
    program: Program<SolanaPrograms> | undefined
    pixelData?: PixelAccount,
    selectedColor: Color
}

export default function Pixel({ posX, posY, program, pixelData, selectedColor }: Props) {
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

      const updatePixel =async () => {
        await program!.methods
              .updatePixel(selectedColor.r, selectedColor.g, selectedColor.b)
              .accounts({
                pixel: getPixelAddress()
              })
              .rpc()
      }
    
      const createPixel = async () => {
        console.log(getPixelAddress(), "pixelAddress")
        await program!.methods
            .createPixel(posX, posY, selectedColor.r, selectedColor.g, selectedColor.b)
            .accounts({
              pixel: getPixelAddress(),
              user: program!.provider.publicKey,
              systemProgram: SystemProgram.programId,
            })
            .rpc();
      }

    return (
        <td
            className="h-4 min-w-[1rem]"
            style={{backgroundColor: color}}
            onClick={pixelData ? updatePixel : createPixel}
        />
    )
}
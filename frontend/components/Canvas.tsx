import clsx from "clsx"
import Pixel from "./Pixel"
import {Program} from "@project-serum/anchor"
import { useEffect } from "react"
import { SolanaPrograms } from "@/idl/drawOnSolana"

interface Props {
    program: Program<SolanaPrograms> | undefined
}

export default function Canvas({program} : Props) {
    const disabled = !program

    const fetchPixels =async () => {
        if(program){
            try {
                const pixels = await program.account.pixel.all()
                console.log(pixels)
            } catch (e) {
                console.log(e)
            }
        }
    }

    useEffect(() => {
        fetchPixels()
    }, [program])

    return (
        <div className={clsx(disabled && "opacity-25 cursor-not-allowed")}>
            <table className="border border-gray-300 table-fixed">
                <tbody className="divide-y divide-gray-300">
                    {[...Array(100)].map((_, y) => {
                        return (
                            <tr className="divide-x divide-gray-300" key={y}>
                                {[...Array(100)].map((_, x) => {
                                    return (
                                        <Pixel
                                            posX={x}
                                            posY={y}
                                            key={x}
                                            program={program}
                                        />
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
import clsx from "clsx"
import Pixel from "./Pixel"
import {IdlAccounts, Program} from "@project-serum/anchor"
import { useEffect, useState, useMemo } from "react"
import { SolanaPrograms } from "@/idl/drawOnSolana"

interface Props {
    program: Program<SolanaPrograms> | undefined
}

type PixelAccount = IdlAccounts<SolanaPrograms>['pixel']

export default function Canvas({program} : Props) {
    const disabled = !program
    const [fetchedPixels, setFetchedPixels] = useState<PixelAccount[]>([])

    const fetchPixels =async () => {
        if(program){
            try {
                const pixels = await program.account.pixel.all()
                console.log("got the pixels", pixels)
                setFetchedPixels(pixels.map(p => p.account))
            } catch (e) {
                console.log(e)
            }
        }
    }

    useEffect(() => {
        fetchPixels()
    }, [program])

    const pixelsMap = useMemo(() => {
        const map: { [id: number]: PixelAccount } = {}
        fetchedPixels.forEach(p => {
            const id = p.posY * 100 + p.posX
            map[id] = p
        })
        return map
    }, [fetchedPixels])

    return (
        <div className={clsx(disabled && "opacity-25 cursor-not-allowed")}>
            <table className="border border-gray-300 table-fixed">
                <tbody className="divide-y divide-gray-300">
                    {[...Array(100)].map((_, y) => {
                        return (
                            <tr className="divide-x divide-gray-300" key={y}>
                                {[...Array(100)].map((_, x) => {
                                    const id = y * 100 + x
                                    const pixelData = pixelsMap[id]
                                    return (
                                        <Pixel
                                            posX={x}
                                            posY={y}
                                            key={x}
                                            program={program}
                                            pixelData={pixelData}
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
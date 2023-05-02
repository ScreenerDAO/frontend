import type { NextApiRequest, NextApiResponse } from "next/types";
import { saveFile } from "src/lib/generalMethods";
import { File } from 'nft.storage';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const promisePinEstuary = fetch('https://api.estuary.tech/content/add-ipfs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${process.env.ESTUARY_API_KEY}`
            },
            body: JSON.stringify({
                cid: req.query.cid,
                meta: {},
                name: "",
                origins: []
            })
        })

        const promiseGetFile = fetch(`${process.env.NEXT_PUBLIC_INFURA_GATEWAY}${req.query.cid}`)
        const responseGetFile = await promiseGetFile

        if (responseGetFile.ok) {
            const blob = await responseGetFile.blob()
            const file = new File([blob], '')
            await saveFile(file)
        }
        else {
            res.status(500).send("Error storing on nft.storage")
        }

        const responsePinEstuary = await promisePinEstuary

        if (!responsePinEstuary.ok) {
            res.status(500).send("Error pinning file in Estuary")
        }

        res.status(200).send(req.query.cid)
    }
    catch (error) {
        res.status(500).send("There was an error pining the file")
    }
}

export default handler
import type { NextApiRequest, NextApiResponse } from "next/types";
import { saveFile } from 'src/lib/generalMethods'
import { Buffer } from 'buffer';
import { File } from 'nft.storage';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '50mb'
        },
    },
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const base64 = JSON.parse(req.body).fileBase64
        
        const buffer = Buffer.from(base64, 'base64');
        const file = new File([buffer], '')
        const cid = await saveFile(file)

        res.send(cid)
    }
    catch (error) {
        res.status(500).send("There was an error storing the file")
    }
}

export default handler
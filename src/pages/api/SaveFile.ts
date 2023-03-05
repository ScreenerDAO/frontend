import type { NextApiRequest, NextApiResponse } from "next/types";
import { saveFile } from 'src/lib/generalMethods'

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20mb',
        },
    },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const hash = await saveFile(req.body.file)

        res.status(200).send(hash)
    }
    catch (error) {
        res.status(500).send("There was an error storing the file")
    }
}



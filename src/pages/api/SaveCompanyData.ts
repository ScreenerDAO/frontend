import type { NextApiRequest, NextApiResponse } from "next/types";
import { saveCompanyData } from 'src/helpers/generalMethods'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const hash = await saveCompanyData(req.body)

        res.status(200).send(hash)
    }
    catch (error) {
        res.status(500).send("There was an error storing the file")
    }
}

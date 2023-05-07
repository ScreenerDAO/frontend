import { useAppSelector } from "@/hooks"

const CellValue = ({ value }: { value: string }) => {
    const valuesAsMillions = useAppSelector(state => state.general.valuesAsMillions)
    const number = Number(value)

    if (isNaN(number) || number === 0) {
        return <>-</>
    }

    if (valuesAsMillions) {
        return <>{parseFloat((number / 1000000).toFixed(2)).toLocaleString()}</>
    }

    return <>{number.toLocaleString()}</>
}

export default CellValue
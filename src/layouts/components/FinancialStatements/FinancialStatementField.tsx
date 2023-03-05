import * as React from 'react'

interface IFinancialStatementFieldProps {
    fieldData: {
        key: string,
        description: string
    },
    h1Fields: string[],
    h3Fields: string[]
}

const FinancialStatementField = (props: IFinancialStatementFieldProps): React.ReactElement => {
    if (props.h1Fields.includes(props.fieldData.key)) {

        return <b>{props.fieldData.description}</b>
    }
    if (props.h3Fields.includes(props.fieldData.key)) {

        return <b>{props.fieldData.description}</b>
    }
    
    return <>{props.fieldData.description}</>
}

export default FinancialStatementField
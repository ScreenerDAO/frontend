import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Typography } from "antd";
import { balanceSheetTypesNames } from "src/types/FinancialStatementsTypes";
import EditInputElement, { StatementType, getLabelName } from "./EditInputElement";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IRow {
    title: number;
    elements: Array<number | IRow>;
    total: number;
}

interface IProps {
    row: IRow;
    statementType: StatementType;
}

const AccordionWrapper = ({ row, statementType }: IProps) => {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>{getLabelName(row.title, statementType)}</Typography>
            </AccordionSummary>

            <AccordionDetails>
                <div>
                    {row.elements.map((element, index) => {
                        if (typeof element === "number") {
                            return (
                                <EditInputElement autoComplete={false} label={element} statementType={statementType} />
                            );
                        }
                        return (
                            <AccordionWrapper 
                                key={index} 
                                row={element}
                                statementType={statementType}
                            />
                        )
                    })}
                </div>

                <div style={{ marginTop: '20px' }}>
                    <EditInputElement autoComplete={true} label={row.total} statementType={statementType} />
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionWrapper;
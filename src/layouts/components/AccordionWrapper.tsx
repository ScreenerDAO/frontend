import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Typography } from "antd";
import { IElement, IElementsGroup } from "src/types/FinancialStatementsTypes";
import { StatementType } from "src/types/IStatement";
import EditInputElement, { getLabelName } from "./EditInputElement";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IProps {
    elements: IElementsGroup;
    statementType: StatementType;
    year: number;
    valuesAsThousands: boolean;
}

const getAutofillElements = (elements: Array<IElement | IElementsGroup>) => {
    const values: IElement[] = []

    elements.forEach((element) => {
        if (element && (element as IElementsGroup).total) {
            values.push((element as IElementsGroup).total)
        } 
        else {
            values.push(element as IElement)
        }
    });

    return values;
}

const AccordionWrapper = ({ elements: row, statementType, year, valuesAsThousands }: IProps) => {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{getLabelName(row.title, statementType)}</Typography>
            </AccordionSummary>

            <AccordionDetails>
                <div>
                    {row.elements.map((element, index) => {
                        if (element && (element as IElementsGroup).total) {
                            return (
                                <div style={{ marginTop: '10px' }} key={index}>
                                    <AccordionWrapper
                                        elements={element as IElementsGroup}
                                        statementType={statementType}
                                        year={year}
                                        valuesAsThousands={valuesAsThousands}
                                    />
                                </div>
                            )
                        }

                        return (
                            <EditInputElement
                                key={index}
                                label={(element as IElement).label}
                                statementType={statementType}
                                year={year}
                                valuesAsThousands={valuesAsThousands}
                            />
                        )
                    })}
                </div>

                <div style={{ marginTop: '20px' }}>
                    <EditInputElement
                        label={row.total.label}
                        statementType={statementType}
                        year={year}
                        valuesAsThousands={valuesAsThousands}
                        autofillElements={getAutofillElements(row.elements)}
                    />
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionWrapper;
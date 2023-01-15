import React from 'react'
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { changeValuesAsMillions } from 'src/features/general';

const ThousandsSwitch = (): React.ReactElement => {
    const checked = useAppSelector(state => state.general.valuesAsMillions)
    const dispatch = useAppDispatch()

    return (
        <FormControlLabel
            control={
                <Switch checked={checked} onChange={() => dispatch(changeValuesAsMillions())} />
            }
            label="Values as millions"
        />
    )
}

export default ThousandsSwitch
import React from 'react'
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { changeLogarithmicScale } from '@/features/general';

const LogarithmicScaleSwitch = (): React.ReactElement => {
    const checked = useAppSelector(state => state.general.logarithmicScale)
    const dispatch = useAppDispatch()

    return (
        <FormControlLabel
            control={
                <Switch checked={checked} onChange={() => dispatch(changeLogarithmicScale())} />
            }
            label="Logarithmic scale"
        />
    )
}

export default LogarithmicScaleSwitch
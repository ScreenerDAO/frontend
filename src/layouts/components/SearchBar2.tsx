import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Chip, InputAdornment, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { useRouter } from 'next/router'
import { selectCompany } from 'src/helpers/generalMethods';

export default function FreeSoloCreateOptionDialog() {
    // const [value, setValue] = React.useState<FilmOptionType | null>(null);
    const [value, setValue] = React.useState<string | null>(null)

    const companies = useAppSelector(state => state.general.companies)
    const dispatch = useAppDispatch()
    const router = useRouter()

    return (
        <React.Fragment>
            <Autocomplete
                // value={value}
                // onChange={(event, newValue) => {
                //     if (typeof newValue === 'string') {
                //         // timeout to avoid instant validation of the dialog's form.

                //     }  
                //     else {
                //         // setValue(newValue);
                //     }
                // }}
                // filterOptions={(options, params) => {
                //     console.log(options)
                //     console.log(params)

                //     // const filtered = filter(options, params);

                //     // if (params.inputValue !== '') {
                //     //     filtered.push({
                //     //         inputValue: params.inputValue,
                //     //         title: `Add "${params.inputValue}"`,
                //     //     });
                //     // }

                //     // return filtered;

                //     return options
                // }}
                onChange={(event, newValue) => {
                    if (newValue && typeof newValue !== 'string') {
                        router.push(`/company-overview?id=${newValue.id}`)

                        setValue(newValue.ticker)
                        selectCompany(newValue, dispatch)
                    }
                }}
                options={companies ?? []}
                getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    // if (typeof option === 'string') {
                    //     return option;
                    // }
                    // if (option.inputValue) {
                    //     return option.inputValue;
                    // }
                    // return option.title;

                    if (typeof option === 'string') {
                        return option
                    }

                    return option.name
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                // renderOption={(props, option) => <li {...props}>{option.title}</li>}
                renderOption={(props, option) => (
                    <li {...props} style={{ display: 'flex' }}>
                        <div style={{ marginRight: '10px' }}><b>{option.ticker}</b></div>
                        <div>{option.name}</div>
                    </li>
                )}
                freeSolo
                sx={{ width: 700 }}
                renderInput={(params) => (
                    <TextField
                        sx={{ backgroundColor: 'white' }}
                        {...params}
                        placeholder='Search companies...'
                        InputProps={{
                            ...params.InputProps,
                            // style: { height: '40px'},
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    // InputLabelProps={{
                    //     style: { lineHeight: '40px'}
                    // }}
                    />
                )}
            />
        </React.Fragment>
    );
}


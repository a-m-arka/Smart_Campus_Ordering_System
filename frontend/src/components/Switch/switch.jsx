import React from 'react';
import { Switch as MuiSwitch, FormControlLabel } from '@mui/material';
import { red } from '@mui/material/colors';

const Switch = ({ checked, onChange, onLabel, offLabel, labelSize }) => {
    return (
        <FormControlLabel
            control={
                <MuiSwitch
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    sx={{
                        '& .MuiSwitch-switchBase': {
                            color: 'red',
                        },
                        '& .MuiSwitch-switchBase + .MuiSwitch-track': {
                            backgroundColor: '#ffcdd2',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked': {
                            color: 'rgb(18, 218, 18)',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#a5d6a7',
                        },
                    }}
                />
            }
            label={checked ? onLabel : offLabel}
            sx={{
                '& .MuiFormControlLabel-label': {
                    fontFamily: '"Josefin Sans", sans-serif',  // example font
                    fontSize: labelSize,
                    fontWeight: '600',
                    color: checked ? 'rgb(18, 218, 18)' : 'red',
                    marginTop: '7px',
                    // backgroundColor:'red'
                }
            }}
        />
    );
};

export default Switch;

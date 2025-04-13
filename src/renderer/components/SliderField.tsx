/* eslint-disable react/require-default-props */
import {
    Box,
    FormControl,
    FormLabel,
    Grid,
    Input,
    Slider,
} from '@mui/material';
import { useField } from 'formik';
import { ChangeEvent } from 'react';

interface Props {
    name: string;
    label: string;
    min?: number;
    max?: number;
    step?: number;
}

export default function SliderField({
    name,
    label,
    min,
    max,
    step = 1,
}: Props) {
    const [{ value, onBlur }, , { setValue }] = useField<number>(name);

    const handleSliderChange = (event: Event, newValue: number) => {
        setValue(newValue);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? 0 : Number(event.target.value));
    };

    return (
        <Box sx={{ width: '100%', paddingX: 1 }}>
            <FormControl fullWidth>
                <FormLabel>{label}</FormLabel>
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                    <Grid size="grow">
                        <Slider
                            min={min}
                            max={max}
                            step={step}
                            value={value}
                            onChange={handleSliderChange}
                            valueLabelDisplay="auto"
                            size="small"
                        />
                    </Grid>
                    <Grid>
                        <Input
                            value={value}
                            size="small"
                            onChange={handleInputChange}
                            onBlur={onBlur}
                            inputProps={{
                                step,
                                min,
                                max,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                </Grid>
            </FormControl>
        </Box>
    );
}

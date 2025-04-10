/* eslint-disable react/require-default-props */
import { Box, Button, TextField } from '@mui/material';
import { ErrorMessage, useField } from 'formik';
import { useCallback } from 'react';

interface NumberInputProps {
    name: string;
    label: string;
    min?: number;
    max?: number;
}
export default function NumberField({
    name,
    label,
    min,
    max,
}: NumberInputProps) {
    const [{ value }, , helpers] = useField<number>(name);
    const setValue = useCallback(
        (v: number) => {
            if (min !== undefined && v < min) return;
            if (max !== undefined && v > max) return;
            helpers.setValue(v);
        },
        [min, max, helpers],
    );
    const decrement = useCallback(() => {
        setValue(value - 1);
    }, [value, setValue]);
    const increment = useCallback(() => {
        setValue(value + 1);
    }, [value, setValue]);

    return (
        <>
            <Box display="flex" height="max-content">
                <Button
                    type="button"
                    variant="contained"
                    onClick={decrement}
                    disabled={min !== undefined ? value <= min : false}
                    sx={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        minWidth: 0,
                    }}
                >
                    -
                </Button>
                <TextField
                    label={label}
                    inputMode="numeric"
                    slotProps={{
                        htmlInput: {
                            pattern: '[0-9]*',
                        },
                        root: { style: { borderRadius: 0 } },
                    }}
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    size="small"
                    sx={{ flexGrow: 1 }}
                />
                <Button
                    type="button"
                    variant="contained"
                    onClick={increment}
                    disabled={max !== undefined ? value >= max : false}
                    sx={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        minWidth: 0,
                    }}
                >
                    +
                </Button>
            </Box>
            <ErrorMessage name={name} />
        </>
    );
}

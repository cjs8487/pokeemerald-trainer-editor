/* eslint-disable react/require-default-props */
import {
    Autocomplete,
    FormControl,
    InputLabel,
    Select,
    SxProps,
    TextField,
} from '@mui/material';
import { useField } from 'formik';
import { PropsWithChildren } from 'react';

interface SelectProps extends PropsWithChildren {
    name: string;
    label: string;
    sx?: SxProps;
}

export function SelectField({ name, label, sx, children }: SelectProps) {
    const [field, meta, helpers] = useField<string | null>(name);

    const error = meta.touched && !!meta.error;

    return (
        <FormControl sx={sx}>
            <InputLabel error={error}>{label}</InputLabel>
            <Select
                name={name}
                label={label}
                value={field.value ?? ''}
                onChange={(e) => {
                    helpers.setValue(e.target.value ?? '');
                }}
                onBlur={field.onBlur}
                error={meta.touched && !!meta.error}
            >
                {children}
            </Select>
        </FormControl>
    );
}

interface AutocompleteProps {
    name: string;
    label: string;
    options: string[];
    sx?: SxProps;
}

export function AutocompleteSelectField({
    name,
    label,
    options,
    sx,
}: AutocompleteProps) {
    const [field, meta, helpers] = useField<string | null>(name);

    return (
        <Autocomplete
            value={field.value}
            onChange={(_, newValue) => {
                helpers.setValue(newValue);
            }}
            onBlur={field.onBlur}
            blurOnSelect
            clearOnBlur
            options={options}
            sx={sx}
            renderInput={(params) => (
                <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    name={name}
                    label={label}
                    onBlur={field.onBlur}
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                />
            )}
        />
    );
}

export default {};

/* eslint-disable react/require-default-props */
import { Autocomplete, SxProps, TextField } from '@mui/material';
import { useField } from 'formik';

interface Props {
    name: string;
    label: string;
    options: string[];
    placeholder?: string;
    sx?: SxProps;
}

export function AutocompleteSelectField({ name, label, options }: Props) {
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

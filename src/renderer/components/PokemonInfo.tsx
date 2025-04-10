import {
    Box,
    FormControl,
    InputLabel,
    Select,
    Typography,
} from '@mui/material';
import { Field } from 'formik';
import NumberField from './NumberField';

interface Props {
    index: number;
}

export default function PokemonInfo({ index }: Props) {
    return (
        <>
            <FormControl>
                <InputLabel>Species</InputLabel>
                <Field name="class" as={Select}>
                    {/* {trainerClasses.map((c) => (
                        <MenuItem key={c} value={c}>
                            {c}
                        </MenuItem>
                    ))} */}
                </Field>
            </FormControl>
            <Field
                name={`pokemon.${index}.level`}
                as={NumberField}
                min={1}
                max={100}
                label="Level"
            />
            <Box>
                <Typography>IVs</Typography>
                <Box sx={{ display: 'flex' }}>
                    <Field
                        name={`pokemon.${index}.ivs.hp`}
                        as={NumberField}
                        min={0}
                        max={31}
                        label="HP"
                    />
                    <Field
                        name={`pokemon.${index}.ivs.atk`}
                        as={NumberField}
                        min={0}
                        max={31}
                        label="Attack"
                    />
                    <Field
                        name={`pokemon.${index}.ivs.def`}
                        as={NumberField}
                        min={0}
                        max={31}
                        label="Defense"
                    />
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Field
                        name={`pokemon.${index}.ivs.spa`}
                        as={NumberField}
                        min={0}
                        max={31}
                        label="Special Attack"
                    />
                    <Field
                        name={`pokemon.${index}.ivs.spd`}
                        as={NumberField}
                        min={0}
                        max={31}
                        label="Special Defense"
                    />
                    <Field
                        name={`pokemon.${index}.ivs.spe`}
                        as={NumberField}
                        min={0}
                        max={31}
                        label="Speed"
                    />
                </Box>
            </Box>
            <Box>
                <Typography>EVs</Typography>
                <Box sx={{ display: 'flex' }}>
                    <Field
                        name={`pokemon.${index}.evs.hp`}
                        as={NumberField}
                        min={0}
                        max={255}
                        label="HP"
                    />
                    <Field
                        name={`pokemon.${index}.evs.atk`}
                        as={NumberField}
                        min={0}
                        max={255}
                        label="Attack"
                    />
                    <Field
                        name={`pokemon.${index}.evs.def`}
                        as={NumberField}
                        min={0}
                        max={255}
                        label="Defense"
                    />
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Field
                        name={`pokemon.${index}.evs.spa`}
                        as={NumberField}
                        min={0}
                        max={255}
                        label="Special Attack"
                    />
                    <Field
                        name={`pokemon.${index}.evs.spd`}
                        as={NumberField}
                        min={0}
                        max={255}
                        label="Special Defense"
                    />
                    <Field
                        name={`pokemon.${index}.evs.spe`}
                        as={NumberField}
                        min={0}
                        max={255}
                        label="Speed"
                    />
                </Box>
            </Box>
        </>
    );
}

import { Box, Button, Typography } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import { Field } from 'formik';
import { Pokemon } from 'koffing';
import { useLayoutEffect, useState } from 'react';
import { pokedex } from '../Pokedex';
import NumberField from './NumberField';
import { AutocompleteSelectField } from './SelectField';

interface Props {
    pokemon: Pokemon;
    index: number;
    remove: () => void;
    canRemove: boolean;
}

export default function PokemonInfo({
    pokemon,
    index,
    remove,
    canRemove,
}: Props) {
    const [loaded, setLoaded] = useState(false);
    const [sprite, setSprite] = useState<string | undefined>(undefined);
    const [pokemonList, setPokemonList] = useState<string[]>([]);
    useLayoutEffect(() => {
        const load = async () => {
            try {
                if (pokemon.name) {
                    const mon = await pokedex.getPokemonByName(pokemon.name);
                    setSprite(mon.sprites.front_default ?? '');
                }
                const monList = await pokedex.getPokemonsList();
                setPokemonList(
                    monList.results.map(
                        (v) => v.name.charAt(0).toUpperCase() + v.name.slice(1),
                    ),
                );
            } catch {
                //
            }
            setLoaded(true);
        };
        load();
    }, [pokemon.name]);

    if (!loaded) {
        return null;
    }

    return (
        <>
            <img src={sprite} alt={pokemon.name} />
            <Field
                name={`pokemon.${index}.name`}
                label="Species"
                options={pokemonList}
                as={AutocompleteSelectField}
            />
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
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ flexGrow: 1 }} />
                {canRemove && (
                    <Button
                        onClick={remove}
                        color="error"
                        startIcon={<Delete />}
                    >
                        Remove
                    </Button>
                )}
            </Box>
        </>
    );
}

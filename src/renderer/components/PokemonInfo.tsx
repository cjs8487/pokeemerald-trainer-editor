import Delete from '@mui/icons-material/Delete';
import { Box, Button, Typography } from '@mui/material';
import { Field } from 'formik';
import { Pokemon } from 'koffing';
import { useLayoutEffect, useState } from 'react';
import { pokedex } from '../Pokedex';
import NumberField from './NumberField';
import { AutocompleteSelectField } from './SelectField';
import SliderField from './SliderField';

interface Props {
    pokemon: Pokemon;
    index: number;
    remove: () => void;
    canRemove: boolean;
    pokemonList: string[];
}

export default function PokemonInfo({
    pokemon,
    index,
    remove,
    canRemove,
    pokemonList,
}: Props) {
    const [sprite, setSprite] = useState<string | undefined>(undefined);
    useLayoutEffect(() => {
        const load = async () => {
            try {
                if (pokemon.name) {
                    const mon = await pokedex.getPokemonByName(pokemon.name);
                    setSprite(mon.sprites.front_default ?? '');
                }
            } catch {
                //
            }
        };
        load();
    }, [pokemon.name]);

    return (
        <Box sx={{ width: '100%', pt: 1 }}>
            <Box sx={{ width: '100%', display: 'flex' }}>
                <img
                    src={sprite}
                    alt={pokemon.name}
                    style={{
                        width: '33%',
                        aspectRatio: '1 / 1',
                        objectFit: 'cover',
                        imageRendering: 'crisp-edges',
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: 1.5,
                    }}
                >
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
                </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Typography>IVs</Typography>
                <Box sx={{ display: 'flex', width: '100%' }}>
                    <SliderField
                        name={`pokemon.${index}.ivs.hp`}
                        min={0}
                        max={31}
                        label="HP"
                    />
                    <SliderField
                        name={`pokemon.${index}.ivs.atk`}
                        min={0}
                        max={31}
                        label="Attack"
                    />
                    <SliderField
                        name={`pokemon.${index}.ivs.def`}
                        min={0}
                        max={31}
                        label="Defense"
                    />
                </Box>
                <Box sx={{ display: 'flex', width: '100%' }}>
                    <SliderField
                        name={`pokemon.${index}.ivs.spa`}
                        min={0}
                        max={31}
                        label="Sp. Attack"
                    />
                    <SliderField
                        name={`pokemon.${index}.ivs.spd`}
                        min={0}
                        max={31}
                        label="Sp. Defense"
                    />
                    <SliderField
                        name={`pokemon.${index}.ivs.spe`}
                        min={0}
                        max={31}
                        label="Speed"
                    />
                </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Typography>EVs</Typography>
                <Box sx={{ display: 'flex', width: '100%' }}>
                    <SliderField
                        name={`pokemon.${index}.evs.hp`}
                        min={0}
                        max={252}
                        step={4}
                        label="HP"
                    />
                    <SliderField
                        name={`pokemon.${index}.evs.atk`}
                        min={0}
                        max={252}
                        step={4}
                        label="Attack"
                    />
                    <SliderField
                        name={`pokemon.${index}.evs.def`}
                        min={0}
                        max={252}
                        step={4}
                        label="Defense"
                    />
                </Box>
                <Box sx={{ display: 'flex', width: '100%' }}>
                    <SliderField
                        name={`pokemon.${index}.evs.spa`}
                        min={0}
                        max={252}
                        step={4}
                        label="Sp. Attack"
                    />
                    <SliderField
                        name={`pokemon.${index}.evs.spd`}
                        min={0}
                        max={252}
                        step={4}
                        label="Sp. Defense"
                    />
                    <SliderField
                        name={`pokemon.${index}.evs.spe`}
                        min={0}
                        max={252}
                        step={4}
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
        </Box>
    );
}

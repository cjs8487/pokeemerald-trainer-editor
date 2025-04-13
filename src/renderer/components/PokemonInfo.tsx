import Delete from '@mui/icons-material/Delete';
import { Box, Button, Typography } from '@mui/material';
import { Field } from 'formik';
import { Pokemon } from 'koffing';
import { useLayoutEffect, useState } from 'react';
import { getPokemonList, pokedex } from '../Pokedex';
import NumberField from './NumberField';
import { AutocompleteSelectField } from './SelectField';
import SliderField from './SliderField';

interface MoveSelectProps {
    monIndex: number;
    slot: number;
    moves: string[];
}

function MoveSelect({ monIndex, slot, moves }: MoveSelectProps) {
    return (
        <AutocompleteSelectField
            name={`pokemon.${monIndex}.moves.${slot}`}
            label=""
            options={moves}
        />
    );
}

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
    const [sprite, setSprite] = useState<string | undefined>(undefined);
    const [moveList, setMoveList] = useState<string[]>([]);

    useLayoutEffect(() => {
        const load = async () => {
            try {
                if (pokemon.name) {
                    const mon = await pokedex.getPokemonByName(pokemon.name);
                    setSprite(mon.sprites.front_default ?? '');
                    setMoveList(
                        mon.moves.map((m) =>
                            m.move.name
                                .split('-')
                                .map(
                                    (w) =>
                                        w.charAt(0).toUpperCase() + w.slice(1),
                                )
                                .join(' '),
                        ),
                    );
                }
            } catch {
                //
            }
        };
        load();
    }, [pokemon.name]);

    return (
        <Box sx={{ width: '100%', pt: 1 }}>
            <Box sx={{ width: '100%', display: 'flex', columnGap: 1 }}>
                <img
                    src={sprite}
                    alt={pokemon.name}
                    style={{
                        flex: '0 1 33%',
                        aspectRatio: '1 / 1',
                        objectFit: 'contain',
                        imageRendering: 'crisp-edges',
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: 1.5,
                        flex: '1 0 67%',
                    }}
                >
                    <Field
                        name={`pokemon.${index}.name`}
                        label="Species"
                        options={getPokemonList()}
                        as={AutocompleteSelectField}
                    />
                    <Field
                        name={`pokemon.${index}.level`}
                        as={NumberField}
                        min={1}
                        max={100}
                        label="Level"
                    />
                    <Box
                        component="fieldset"
                        sx={{
                            borderColor: 'divider',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: 0.5,
                            width: '100%',
                            justifyItems: 'stretch',
                        }}
                    >
                        <Typography component="legend">Moves</Typography>

                        <MoveSelect
                            monIndex={index}
                            slot={0}
                            moves={moveList}
                        />
                        <MoveSelect
                            monIndex={index}
                            slot={1}
                            moves={moveList}
                        />

                        <MoveSelect
                            monIndex={index}
                            slot={2}
                            moves={moveList}
                        />
                        <MoveSelect
                            monIndex={index}
                            slot={3}
                            moves={moveList}
                        />
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    borderColor: 'divider',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    columnGap: 4,
                    rowGap: 1,
                }}
                component="fieldset"
            >
                <Typography component="legend">IVs</Typography>
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
            <Box
                sx={{
                    width: '100%',
                    borderColor: 'divider',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    columnGap: 4,
                    rowGap: 1,
                }}
                component="fieldset"
            >
                <Typography component="legend">EVs</Typography>
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

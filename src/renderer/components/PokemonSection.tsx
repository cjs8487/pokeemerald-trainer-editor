import Add from '@mui/icons-material/Add';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Tab } from '@mui/material';
import { FieldArray } from 'formik';
import { Pokemon } from 'koffing';
import { SyntheticEvent, useLayoutEffect, useState } from 'react';
import PokemonInfo from './PokemonInfo';

interface Props {
    pokemon: Pokemon[];
}

export default function PokemonSection({ pokemon }: Props) {
    const [selected, setSelected] = useState(0);

    useLayoutEffect(() => {
        if (selected >= pokemon.length) {
            setSelected(pokemon.length - 1);
        }
    }, [selected, pokemon.length]);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setSelected(newValue);
    };

    return (
        <FieldArray name="pokemon">
            {({ push, remove }) => (
                <Box sx={{ display: 'flex' }}>
                    <TabContext value={selected}>
                        <Box sx={{ borderRight: 1, borderColor: 'divider' }}>
                            <TabList
                                onChange={handleChange}
                                orientation="vertical"
                            >
                                {pokemon.map((mon, index) => (
                                    <Tab
                                        label={`${mon.name} lvl ${mon.level}`}
                                        value={index}
                                    />
                                ))}
                            </TabList>
                            <Button
                                sx={{ textAlign: 'center' }}
                                color="success"
                                startIcon={<Add />}
                                onClick={() => {
                                    const mon = new Pokemon();
                                    mon.level = 1;
                                    push(mon);
                                    setSelected(pokemon.length);
                                }}
                            >
                                Add Pokemon
                            </Button>
                        </Box>
                        {pokemon.map((mon, index) => (
                            <TabPanel value={index}>
                                <PokemonInfo
                                    pokemon={mon}
                                    index={index}
                                    remove={() => remove(index)}
                                    canRemove={pokemon.length > 1}
                                />
                            </TabPanel>
                        ))}
                    </TabContext>
                </Box>
            )}
        </FieldArray>
    );
}

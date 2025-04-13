import Add from '@mui/icons-material/Add';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Tab } from '@mui/material';
import { FieldArray } from 'formik';
import { Pokemon } from 'koffing';
import { SyntheticEvent, useLayoutEffect, useState } from 'react';
import { AutoSizer } from 'react-virtualized';
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
        <AutoSizer disableWidth>
            {({ height }) => (
                <FieldArray name="pokemon">
                    {({ push, remove }) => (
                        <TabContext value={selected}>
                            <Box sx={{ display: 'flex', height: '100%' }}>
                                <Box
                                    sx={{
                                        borderRight: 1,
                                        borderColor: 'divider',
                                        flex: '1 1 20%',
                                        width: '20%',
                                        height,
                                    }}
                                >
                                    <TabList
                                        onChange={handleChange}
                                        orientation="vertical"
                                        sx={{ maxHeight: height }}
                                        visibleScrollbar
                                    >
                                        {pokemon.map((mon, index) => (
                                            <Tab
                                                label={mon.name ?? 'Unselected'}
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
                                    <TabPanel
                                        value={index}
                                        sx={{ width: '80%' }}
                                    >
                                        <PokemonInfo
                                            pokemon={mon}
                                            index={index}
                                            remove={() => remove(index)}
                                            canRemove={pokemon.length > 1}
                                        />
                                    </TabPanel>
                                ))}
                            </Box>
                        </TabContext>
                    )}
                </FieldArray>
            )}
        </AutoSizer>
    );
}

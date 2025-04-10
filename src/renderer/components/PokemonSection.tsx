import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { FieldArray } from 'formik';
import { Pokemon } from 'koffing';
import { SyntheticEvent, useState } from 'react';
import PokemonInfo from './PokemonInfo';

interface Props {
    pokemon: Pokemon[];
}

export default function PokemonSection({ pokemon }: Props) {
    const [selected, setSelected] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setSelected(newValue);
    };

    return (
        <TabContext value={selected}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange}>
                    {pokemon.map((mon, index) => (
                        <Tab label={mon.name} value={index} />
                    ))}
                </TabList>
            </Box>
            <FieldArray name="pokemon">
                {() => (
                    <>
                        {pokemon.map((mon, index) => (
                            <TabPanel value={index}>
                                <PokemonInfo index={index} />
                            </TabPanel>
                        ))}
                    </>
                )}
            </FieldArray>
        </TabContext>
    );
}

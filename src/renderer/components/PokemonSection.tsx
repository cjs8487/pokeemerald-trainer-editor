import Add from '@mui/icons-material/Add';
import {
    Box,
    Container,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { FieldArray } from 'formik';
import { Pokemon } from 'koffing';
import { useLayoutEffect, useState } from 'react';
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

    return (
        <AutoSizer disableWidth>
            {({ height }) => (
                <FieldArray name="pokemon">
                    {({ push, remove }) => (
                        <Box sx={{ display: 'flex', height: '100%' }}>
                            <List
                                sx={{
                                    maxHeight: height,
                                    overflowY: 'auto',
                                    borderRight: 1,
                                    borderColor: 'divider',
                                    flex: '1 1 20%',
                                    width: '20%',
                                    height,
                                }}
                            >
                                {pokemon.map((mon, index) => (
                                    <ListItemButton
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={index}
                                        onClick={() => setSelected(index)}
                                        selected={index === selected}
                                        sx={{
                                            borderLeft:
                                                index === selected ? 5 : 0,
                                            borderColor: (theme) =>
                                                theme.palette.info.main,
                                            paddingLeft:
                                                index === selected ? 3 : 2,
                                            transition: 'all 0.25s ease-in-out',
                                        }}
                                    >
                                        <ListItemText
                                            primary={
                                                mon.name ?? 'Unselected Pokemon'
                                            }
                                            secondary={`lvl ${mon.level}`}
                                        />
                                    </ListItemButton>
                                ))}
                                <ListItemButton
                                    onClick={() => {
                                        const mon = new Pokemon();
                                        mon.level = 1;
                                        push(mon);
                                        setSelected(pokemon.length);
                                    }}
                                >
                                    <ListItemIcon>
                                        <Add />
                                    </ListItemIcon>
                                    <ListItemText primary="Add Pokemon" />
                                </ListItemButton>
                            </List>
                            <Container
                                sx={{
                                    width: '80%',
                                    maxWidth: '80%',
                                    height,
                                    maxHeight: height,
                                    overflowY: 'auto',
                                }}
                            >
                                {pokemon[selected] && (
                                    <PokemonInfo
                                        key={selected}
                                        pokemon={pokemon[selected]}
                                        index={selected}
                                        remove={() => remove(selected)}
                                        canRemove={pokemon.length > 1}
                                    />
                                )}
                            </Container>
                        </Box>
                    )}
                </FieldArray>
            )}
        </AutoSizer>
    );
}

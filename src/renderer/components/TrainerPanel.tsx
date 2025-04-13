import { Box, Button, Container } from '@mui/material';
import { Form, Formik } from 'formik';
import { Trainer } from '../../shared/types';
import TrainerInfo from './TrainerInfo';
import PokemonSection from './PokemonSection';

interface Props {
    trainer: Trainer;
    trainerPics: string[];
    trainerClasses: string[];
    encounterMusic: string[];
    pokemonList: string[];
}

export default function TrainerPanel({
    trainer,
    trainerPics,
    trainerClasses,
    encounterMusic,
    pokemonList,
}: Props) {
    return (
        <Container sx={{ height: '100%', pt: 1 }}>
            <Formik initialValues={trainer} onSubmit={() => {}}>
                {({ values: { pic, pokemon } }) => (
                    <Form style={{ height: '100%' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    borderBottom: 1,
                                    borderColor: 'divider',
                                    pb: 1,
                                    mb: 2,
                                }}
                            >
                                <TrainerInfo
                                    trainerPics={trainerPics}
                                    trainerClasses={trainerClasses}
                                    encounterMusic={encounterMusic}
                                />
                                <img
                                    src={`porytrainer://media/trainer/${pic.toLowerCase().replaceAll(' ', '_')}`}
                                    alt={pic}
                                    style={{
                                        width: '33%',
                                        height: '100%',
                                        flexShrink: 1,
                                        aspectRatio: '1 / 1',
                                        objectFit: 'cover',
                                        imageRendering: 'crisp-edges',
                                    }}
                                />
                            </Box>
                            <Box sx={{ flex: '1 0 auto' }}>
                                <PokemonSection
                                    pokemon={pokemon ?? []}
                                    pokemonList={pokemonList}
                                />
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ flexGrow: 1 }} />
                                <Button type="submit" color="success">
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}

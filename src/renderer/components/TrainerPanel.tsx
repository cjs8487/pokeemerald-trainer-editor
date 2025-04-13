import { Box, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { Trainer } from '../../shared/types';
import PokemonSection from './PokemonSection';
import TrainerInfo from './TrainerInfo';

interface Props {
    trainer: Trainer;
    trainerPics: string[];
    trainerClasses: string[];
    encounterMusic: string[];
}

export default function TrainerPanel({
    trainer,
    trainerPics,
    trainerClasses,
    encounterMusic,
}: Props) {
    return (
        <Box
            sx={{
                height: '100%',
                maxHeight: '100%',
                overflowY: 'auto',
                px: 1,
            }}
        >
            <Formik initialValues={trainer} onSubmit={() => {}}>
                {({ values: { pic, pokemon } }) => (
                    <Form
                        style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            maxHeight: '100%',
                            overflowY: 'auto',
                            paddingTop: 8,
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
                            <PokemonSection pokemon={pokemon ?? []} />
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ flexGrow: 1 }} />
                            <Button type="submit" color="success">
                                Save
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}

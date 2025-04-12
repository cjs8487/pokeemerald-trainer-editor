import { Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { Trainer } from '../../shared/types';
import TrainerInfo from './TrainerInfo';
import PokemonSection from './PokemonSection';

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
        <div>
            <Formik initialValues={trainer} onSubmit={() => {}}>
                {({ values: { pic } }) => (
                    <Form>
                        <div style={{ display: 'flex', width: '100%' }}>
                            <TrainerInfo
                                trainerPics={trainerPics}
                                trainerClasses={trainerClasses}
                                encounterMusic={encounterMusic}
                            />
                            <img
                                src={`porytrainer://media/trainer/${trainer.pic.toLowerCase().replaceAll(' ', '_')}`}
                                alt={pic}
                                style={{
                                    width: '50%',
                                    height: '100%',
                                    flexShrink: 1,
                                    aspectRatio: '1 / 1',
                                    objectFit: 'cover',
                                    imageRendering: 'crisp-edges',
                                }}
                            />
                        </div>
                        <PokemonSection pokemon={trainer.pokemon ?? []} />
                        <Button type="submit">Submit</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

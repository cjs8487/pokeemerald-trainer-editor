import { Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { Trainer, TrainerPics } from '../../shared/types';
import TrainerInfo from './TrainerInfo';

interface Props {
    trainer: Trainer;
    trainerPics: TrainerPics;
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
                                src={`data:image/png;base64, ${trainerPics[pic]}`}
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
                        <Button type="submit">Submit</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

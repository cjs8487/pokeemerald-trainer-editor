import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { Trainer, TrainerPics } from '../../shared/types';

interface Props {
    trainer: Trainer;
    trainerPics: TrainerPics;
    trainerClasses: string[];
}

export default function TrainerPanel({
    trainer,
    trainerPics,
    trainerClasses,
}: Props) {
    return (
        <div>
            <Formik initialValues={trainer} onSubmit={() => {}}>
                {({ values: { pic } }) => (
                    <div style={{ display: 'flex' }}>
                        <Form>
                            <Field name="name" label="Name" as={TextField} />
                            <FormControl>
                                <InputLabel>Pic</InputLabel>
                                <Field name="pic" label="Pic" as={Select}>
                                    {Object.keys(trainerPics).map((p) => (
                                        <MenuItem key={p} value={p}>
                                            {p}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </FormControl>
                            <FormControl>
                                <InputLabel>Class</InputLabel>
                                <Field name="class" label="Class" as={Select}>
                                    {trainerClasses.map((c) => (
                                        <MenuItem key={c} value={c}>
                                            {c}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </FormControl>
                            <Button type="submit">Submit</Button>
                        </Form>
                        <img
                            src={`data:image/png;base64, ${trainerPics[pic]}`}
                            alt={pic}
                            style={{ width: '128px', aspectRatio: '1 / 1' }}
                        />
                    </div>
                )}
            </Formik>
        </div>
    );
}

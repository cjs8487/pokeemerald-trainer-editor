import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
} from '@mui/material';
import { Field } from 'formik';

interface Props {
    trainerPics: string[];
    trainerClasses: string[];
    encounterMusic: string[];
}

export default function TrainerInfo({
    trainerPics,
    trainerClasses,
    encounterMusic,
}: Props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <Field name="name" label="Name" as={TextField} />
            <FormControl>
                <InputLabel>Pic</InputLabel>
                <Field name="pic" label="Pic" as={Select}>
                    {trainerPics.map((p) => (
                        <MenuItem key={p} value={p}>
                            {p}
                        </MenuItem>
                    ))}
                </Field>
            </FormControl>
            <FormControl>
                <InputLabel>Class</InputLabel>
                <Field name="class" as={Select}>
                    {trainerClasses.map((c) => (
                        <MenuItem key={c} value={c}>
                            {c}
                        </MenuItem>
                    ))}
                </Field>
            </FormControl>
            <FormControl>
                <InputLabel>Gender</InputLabel>
                <Field name="gender" as={Select}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                </Field>
            </FormControl>
            <FormControlLabel
                control={
                    <Field name="doubleBattle" as={Switch} type="checkbox" />
                }
                label="Double Battle"
            />
            <FormControl>
                <InputLabel>Music</InputLabel>
                <Field name="music" as={Select}>
                    {encounterMusic.map((m) => (
                        <MenuItem key={m} value={m}>
                            {m}
                        </MenuItem>
                    ))}
                </Field>
            </FormControl>
        </div>
    );
}

import {
    Box,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                rowGap: 1.5,
            }}
        >
            <Box sx={{ display: 'flex', columnGap: 1.5 }}>
                <Field
                    name="name"
                    label="Name"
                    as={TextField}
                    sx={{ flex: '1 0 auto' }}
                />
                <FormControl sx={{ flex: '1 0 auto', maxWidth: '25%' }}>
                    <InputLabel id="trainer-gender-label">Gender</InputLabel>
                    <Field name="gender" label="Gender" as={Select}>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </Field>
                </FormControl>
            </Box>
            <Box sx={{ display: 'flex', columnGap: 1.5 }}>
                <FormControl sx={{ flex: '1 1 auto' }}>
                    <InputLabel>Pic</InputLabel>
                    <Field name="pic" label="Pic" as={Select}>
                        {trainerPics.map((p) => (
                            <MenuItem key={p} value={p}>
                                {p}
                            </MenuItem>
                        ))}
                    </Field>
                </FormControl>
                <FormControl sx={{ flex: '1 1 auto' }}>
                    <InputLabel>Class</InputLabel>
                    <Field name="class" label="Class" as={Select}>
                        {trainerClasses.map((c) => (
                            <MenuItem key={c} value={c}>
                                {c}
                            </MenuItem>
                        ))}
                    </Field>
                </FormControl>
            </Box>
            <FormControl>
                <InputLabel>Music</InputLabel>
                <Field name="music" label="Music" as={Select}>
                    {encounterMusic.map((m) => (
                        <MenuItem key={m} value={m}>
                            {m}
                        </MenuItem>
                    ))}
                </Field>
            </FormControl>
            <FormControlLabel
                control={
                    <Field name="doubleBattle" as={Switch} type="checkbox" />
                }
                label="Double Battle"
            />
        </Box>
    );
}

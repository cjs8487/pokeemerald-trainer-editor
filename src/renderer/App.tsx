import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    TextField,
} from '@mui/material';
import fuzzysort from 'fuzzysort';
import { useCallback, useLayoutEffect, useState } from 'react';
import {
    AutoSizer,
    ListRowProps,
    List as VirtualList,
} from 'react-virtualized';
import 'react-virtualized/styles.css';
import { Trainer } from '../shared/types';
import './App.css';
import TrainerPanel from './components/TrainerPanel';
import { loadGlobalData } from './Pokedex';

export default function App() {
    const [loadChecksComplete, setLoadChecksComplete] = useState(false);
    const [globalsLoaded, setGlobalsLoaded] = useState(false);
    const [folder, setFolder] = useState('');
    const [trainers, setTrainers] = useState<{ [k: string]: Trainer }>({});
    const [selectedTrainer, setSelectedTrainer] = useState('TRAINER_NONE');
    const [trainerPics, setTrainerPics] = useState<string[]>([]);
    const [trainerClasses, setTrainerClasses] = useState<string[]>([]);
    const [encounterMusic, setEncounterMusic] = useState<string[]>([]);

    const [search, setSearch] = useState('');

    useLayoutEffect(() => {
        const setup = async () => {
            loadGlobalData(() => {
                setGlobalsLoaded(true);
            });
            const storedFolder = await window.electron.storedFolder();
            if (storedFolder) {
                const results = await window.electron.prepare(storedFolder);
                setTrainers(results.trainers);
                setTrainerPics(results.trainerPics);
                setTrainerClasses(results.trainerClasses);
                setEncounterMusic(results.encounterMusic);
                setFolder(storedFolder);
            }
            setLoadChecksComplete(true);
        };
        setup();
    }, []);

    const selectFolder = useCallback(async () => {
        const selectedFolder = await window.electron.selectWorkingFolder();
        const results = await window.electron.prepare(selectedFolder);
        setTrainers(results.trainers);
        setTrainerPics(results.trainerPics);
        setTrainerClasses(results.trainerClasses);
        setEncounterMusic(results.encounterMusic);
        setFolder(selectedFolder);
    }, []);

    const filteredList = fuzzysort.go(search, Object.keys(trainers), {
        all: true,
    });

    const trainerRow = useCallback(
        ({
            key, // Unique key within array of rows
            index, // Index of row within collection
            // isScrolling, // The List is currently being scrolled
            // isVisible, // This row is visible within the List (eg it is not an overscanned row)
            style, // Style object to be applied to row (to position it)
        }: ListRowProps) => {
            const trainer = filteredList[index].target;
            return (
                <ListItemButton
                    key={key}
                    onClick={() => setSelectedTrainer(trainer)}
                    style={style}
                    selected={trainer === selectedTrainer}
                    sx={{
                        borderLeft: trainer === selectedTrainer ? 5 : 0,
                        borderColor: (theme) => theme.palette.info.main,
                        minWidth: 'fit-content',
                        paddingLeft: trainer === selectedTrainer ? 3 : 2,
                        transition: 'all 0.25s ease-in-out',
                    }}
                >
                    <ListItemText>{trainer}</ListItemText>
                </ListItemButton>
            );
        },
        [selectedTrainer, filteredList],
    );

    if (!loadChecksComplete || !globalsLoaded) {
        return null;
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            {!folder && (
                <>
                    <h3>Select your decomp folder to get started.</h3>
                    <button type="button" onClick={selectFolder}>
                        Select Folder
                    </button>
                </>
            )}
            <Box sx={{ display: 'flex', height: '100%' }}>
                <Box
                    sx={{
                        flex: '1 1 auto',
                        width: 'fit-content',
                        borderRight: 1,
                        borderColor: 'divider',
                    }}
                >
                    <TextField
                        placeholder="Search for a trainer"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        size="small"
                        fullWidth
                        sx={{ pr: 1 }}
                    />
                    <AutoSizer>
                        {({ width, height }) => (
                            <List
                                width={width}
                                height={height}
                                rowCount={filteredList.length}
                                rowHeight={50}
                                rowRenderer={trainerRow}
                                component={VirtualList}
                                sx={{ minWidth: 'fit-content' }}
                            />
                        )}
                    </AutoSizer>
                </Box>
                <Box
                    sx={{
                        width: '70%',
                        height: '100%',
                        maxHeight: '100%',
                        overflowY: 'auto',
                    }}
                >
                    <TrainerPanel
                        key={selectedTrainer}
                        trainer={trainers[selectedTrainer]}
                        trainerPics={trainerPics}
                        trainerClasses={trainerClasses}
                        encounterMusic={encounterMusic}
                    />
                </Box>
            </Box>
        </div>
    );
}

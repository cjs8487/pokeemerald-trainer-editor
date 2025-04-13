import { Box, List, ListItemButton, ListItemText } from '@mui/material';
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
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [selectedTrainer, setSelectedTrainer] = useState(0);
    const [trainerPics, setTrainerPics] = useState<string[]>([]);
    const [trainerClasses, setTrainerClasses] = useState<string[]>([]);
    const [encounterMusic, setEncounterMusic] = useState<string[]>([]);

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

    const trainerRow = useCallback(
        ({
            key, // Unique key within array of rows
            index, // Index of row within collection
            // isScrolling, // The List is currently being scrolled
            // isVisible, // This row is visible within the List (eg it is not an overscanned row)
            style, // Style object to be applied to row (to position it)
        }: ListRowProps) => {
            return (
                <ListItemButton
                    key={key}
                    onClick={() => setSelectedTrainer(index)}
                    style={style}
                    selected={index === selectedTrainer}
                    sx={{
                        borderLeft: index === selectedTrainer ? 5 : 0,
                        borderColor: (theme) => theme.palette.info.main,
                        minWidth: 'fit-content',
                        paddingLeft: index === selectedTrainer ? 3 : 2,
                        transition: 'all 0.25s ease-in-out',
                    }}
                >
                    <ListItemText>{trainers[index].key}</ListItemText>
                </ListItemButton>
            );
        },
        [trainers, selectedTrainer],
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
            {trainers.length > 0 && (
                <Box sx={{ display: 'flex', height: '100%' }}>
                    <Box
                        sx={{
                            flex: '1 1 auto',
                            width: 'fit-content',
                            borderRight: 1,
                            borderColor: 'divider',
                        }}
                    >
                        <AutoSizer>
                            {({ width, height }) => (
                                <List
                                    width={width}
                                    height={height}
                                    rowCount={trainers.length}
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
                            key={trainers[selectedTrainer].key}
                            trainer={trainers[selectedTrainer]}
                            trainerPics={trainerPics}
                            trainerClasses={trainerClasses}
                            encounterMusic={encounterMusic}
                        />
                    </Box>
                </Box>
            )}
        </div>
    );
}

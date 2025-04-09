import { useCallback, useState } from 'react';
import { AutoSizer, List, ListRowProps } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { Trainer, TrainerPics } from '../shared/types';
import './App.css';
import TrainerPanel from './components/TrainerPanel';

export default function App() {
    const [folder, setFolder] = useState('');
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [selectedTrainer, setSelectedTrainer] = useState(0);
    const [trainerPics, setTrainerPics] = useState<TrainerPics>({});
    const [trainerClasses, setTrainerClasses] = useState<string[]>([]);
    const [encounterMusic, setEncounterMusic] = useState<string[]>([]);

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
                <button
                    key={key}
                    onClick={() => setSelectedTrainer(index)}
                    type="button"
                    style={style}
                >
                    {trainers[index].key}
                </button>
            );
        },
        [trainers],
    );

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
                <div style={{ display: 'flex', height: '100%', columnGap: 4 }}>
                    <div style={{ flex: '1 0 auto', minWidth: 'fit-content' }}>
                        <AutoSizer>
                            {({ width, height }) => (
                                <List
                                    width={width}
                                    height={height}
                                    rowCount={trainers.length}
                                    rowHeight={40}
                                    rowRenderer={trainerRow}
                                />
                            )}
                        </AutoSizer>
                    </div>
                    <div
                        style={{
                            maxWidth: '75%',
                            maxHeight: '100%',
                            flexGrow: 1,
                        }}
                    >
                        <TrainerPanel
                            key={trainers[selectedTrainer].key}
                            trainer={trainers[selectedTrainer]}
                            trainerPics={trainerPics}
                            trainerClasses={trainerClasses}
                            encounterMusic={encounterMusic}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

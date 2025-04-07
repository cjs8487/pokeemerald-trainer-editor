import { useCallback, useState } from 'react';
import { AutoSizer, List, ListRowProps } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { Trainer } from '../shared/types';
import './App.css';

export default function App() {
    const [folder, setFolder] = useState('');
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [selectedTrainer, setSelectedTrainer] = useState(0);

    const selectFolder = useCallback(async () => {
        const selectedFolder = await window.electron.selectWorkingFolder();
        setTrainers(await window.electron.prepare(selectedFolder));
        setFolder(selectedFolder);
    }, []);

    const trainerRow = useCallback(
        ({
            key, // Unique key within array of rows
            index, // Index of row within collection
            isScrolling, // The List is currently being scrolled
            isVisible, // This row is visible within the List (eg it is not an overscanned row)
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
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flex: '1 1 auto' }}>
                    <AutoSizer>
                        {({ width, height }) => (
                            <List
                                width={width}
                                height={height}
                                rowCount={trainers.length}
                                rowHeight={20}
                                rowRenderer={trainerRow}
                            />
                        )}
                    </AutoSizer>
                </div>
                <div
                    style={{
                        minWidth: '50%',
                        maxWidth: '75%',
                        maxHeight: '100%',
                    }}
                >
                    {JSON.stringify(trainers[selectedTrainer])}
                </div>
            </div>
        </div>
    );
}

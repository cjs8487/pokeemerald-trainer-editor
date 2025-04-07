import { useCallback } from 'react';

export default function Home() {
    const selectFolder = useCallback(async () => {
        const folder = await window.electron.selectWorkingFolder();
        await window.electron.prepare(folder);
    }, []);

    return (
        <div>
            <h3>Select your decomp folder to get started.</h3>
            <button type="button" onClick={selectFolder}>
                Select Folder
            </button>
        </div>
    );
}

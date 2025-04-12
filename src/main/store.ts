import settings from 'electron-settings';

export const getWorkingDirectory = (): string => {
    return settings.getSync('workingDirectory') as string;
};

export const setWorkingDirectory = (path: string) => {
    settings.setSync('workingDirectory', path);
};

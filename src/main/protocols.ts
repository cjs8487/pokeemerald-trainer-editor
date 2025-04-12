import { net } from 'electron';
import path from 'path';
import url from 'url';
import { getWorkingDirectory } from './store';

const fetchFile = (filePath: string) => {
    try {
        const res = net.fetch(
            url
                .pathToFileURL(path.join(getWorkingDirectory(), filePath))
                .toString(),
        );
        return res;
    } catch {
        throw new Error();
    }
};

const getTrainerSprite = (name: string) => {
    return fetchFile(
        path.join('graphics', 'trainers', 'front_pics', `${name}.png`),
    );
};

const getMediaResource = (type: string, name: string) => {
    switch (type) {
        case 'trainer':
            return getTrainerSprite(name);
        default:
            return new Response();
    }
};

export const protocolHandler = (req: Request) => {
    const reqPath = req.url.slice('porytrainer://'.length);
    const parts = reqPath.toLowerCase().split('/');
    const target = parts.shift();

    switch (target) {
        case 'media':
            if (parts.length < 2) {
                return new Response();
            }
            return getMediaResource(parts[0], parts[1]);
        default:
            return new Response();
    }
};

export default {};

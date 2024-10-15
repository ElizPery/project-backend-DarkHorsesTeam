import fs from 'node:fs/promises';

export const createDirIfNotExist = async (path) => {
    try {
        await fs.access(path);
    } catch (error) {
        if (error.code === 'ENOEND') {
            await fs.mkdir(path);
        }
    }
};
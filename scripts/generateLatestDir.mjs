import { promises as fs } from 'fs';
import { join } from 'path';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(customParseFormat);

const { readdir, cp } = fs;

const PATH_TO_VERSIONS = join('src', 'version');
const DATE_FORMAT = 'YYYY-MM-DD';

async function main() {
    const versions = await readdir(PATH_TO_VERSIONS);

    const versionArrayOfStrings = [...versions]
        .filter((v) => v !== 'latest')
        .sort((a, b) => dayjs(a, DATE_FORMAT).isAfter(dayjs(b, DATE_FORMAT)) ? -1 : 1);

    const latestVersion = versionArrayOfStrings[0];
    const sourceDir = join('src', 'version', latestVersion);
    const destinationDir = join('src', 'version', 'latest');

    await cp(sourceDir, destinationDir, {
        recursive: true,
    })

    console.log(`Latest directory generated from version ${latestVersion} in ${destinationDir}`);
}

main();

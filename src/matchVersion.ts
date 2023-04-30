import { openResumeVersions } from '~/OpenResumeVersion';
import { openResumeLatestVersion } from '~/OpenResumeVersion';
import type { OpenResumeVersion } from '~/OpenResumeVersion';
import * as dayjs from 'dayjs';
import { DATE_VERSION_FORMAT } from '~/config';

const TODAY = dayjs().format(DATE_VERSION_FORMAT);
const UNIT = 'd';

/**
 * Match date string to the closest available version
 *
 * @param version {string} - date string to match
 * @param versions {OpenResumeVersion[]} - list of available versions
 * @returns {OpenResumeVersion[]}
 */
export const matchVersion = (version: string = TODAY, versions: OpenResumeVersion[] = openResumeVersions): OpenResumeVersion => {
    if (version === 'latest') {
        return openResumeLatestVersion;
    }

    const date = dayjs(version, DATE_VERSION_FORMAT);
    const versionsDates = versions.map(version => dayjs(version, DATE_VERSION_FORMAT));

    const closestVersion = versionsDates.find((version, i, arr) => {
        const next = arr[i + 1];
        const prev = arr[i - 1];

        if (!prev && date.isBefore(version, UNIT)) {
            throw new Error(`Date ${version} is before the first available version ${version.format(DATE_VERSION_FORMAT)}`);
        }

        if (!next)
            return true;

        return (date.isAfter(version, UNIT) || date.isSame(version, UNIT)) && (date.isBefore(next, UNIT));
    });

    if (!closestVersion)
        throw new Error(`No version found for date: ${version}`);

    return closestVersion.format(DATE_VERSION_FORMAT) as OpenResumeVersion;
}

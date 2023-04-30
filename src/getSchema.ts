import { matchVersion } from '~/matchVersion';
import { promises } from 'fs';
import { join } from 'path';
import { LinkedJSONSchema } from 'json-schema-to-typescript/src/types/JSONSchema';

const { readFile } = promises;

export const getSchema = async (version: string): Promise<LinkedJSONSchema> => {
    const match = matchVersion(version);

    const schemaJsonString = await readFile(join(__dirname, `version/${match}/resume.schema.json`));

    return JSON.parse(schemaJsonString.toString());
}

import axios from 'axios';
import JSZip from 'jszip';

/**
 * Fetches data from a zipped json file stored in the applications public directory
 * @param zipFile A path to a zip file stored within the public directory. It is assumed that the zip file
 * has only one file within it. A json which has the same name as the zip file but for the file extension
 */
export async function fetchZippedJsonFile<T>(zipFile: string): Promise<T> {
    let response;
    
    try {
        response = await axios.get(zipFile, {responseType: "blob"});
    }
    catch (err) {
        // TODO: This shouldnt fail but we should do something to notify the user to reload on error
        console.error(`Failed to fetch ${zipFile}`);
        throw Error(`Failed to fetch ${zipFile} data`);      // This right here should be a specific type of exception.
    }

    // Read the zip file
    let responseZip = await JSZip.loadAsync(response.data);
    let responseText = await responseZip.file(`${zipFile.split('.')[0]}.json`)?.async('string');

    if (responseText === undefined) {
        console.error(`Unable to read ${zipFile}`);
        throw Error(`Unable to read ${zipFile} data`);
    }

    return JSON.parse(responseText);
}
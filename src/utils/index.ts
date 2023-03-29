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
    response = await axios.get(zipFile, { responseType: 'blob' });
  } catch (err) {
    // TODO: This shouldnt fail but we should do something to notify the user to reload on error
    console.error(`Failed to fetch ${zipFile}`);
    throw Error(`Failed to fetch ${zipFile} data`); // This right here should be a specific type of exception.
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

/**
 * Creates a colour going from red to green with higher percentages being more red
 * Percentages less than 50 map to a green, greater (or equal) than 50 maps to a red.
 * @param perc A percentage in the space of 0-100
 * @returns A hex colour code where
 */
export function perc2color(perc: number): string {
  let r, g;
  const b = 0;
  if (perc < 50) {
    g = 255;
    r = Math.round(5.1 * perc);
  } else {
    r = 255;
    g = Math.round(510 - 5.1 * perc);
  }
  const h = r * 0x10000 + g * 0x100 + b * 0x1;
  return '#' + ('000000' + h.toString(16)).slice(-6);
}

/**
 * Calculates the median of a list of numbers
 * @param values
 * @returns
 */
export function median(values: number[]): number {
  if (values.length === 0) return 0;

  values.sort((a, b) => a - b);

  const half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
}

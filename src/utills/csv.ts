import fs from 'fs';
import path from 'path';
import axios from 'axios';
import sharp from 'sharp';
import csv from 'csv-parser';

export async function downloadAndResizeImage(url: string, outputFolder: string, csvName: string): Promise<string | null> {
  try {
    const response = await axios({
      url,
      responseType: 'arraybuffer',
    });

    const buffer = Buffer.from(response.data, 'binary');
    const outputFileName = getFileNameFromUrl(url);
    const metadata = await sharp(buffer).metadata();

    // Ensure the output folder exists
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }

    // Resize image to 50% of its original dimensions
    if (metadata.width && metadata.height) {
      const outputFilePath = path.join(outputFolder, `resized-${csvName}-${outputFileName}`);
      await sharp(buffer)
        .resize({
          width: Math.floor(metadata.width / 2),
          height: Math.floor(metadata.height / 2),
        })
        .toFile(outputFilePath);

      console.log(`Image resized and saved as ${outputFilePath}`);
      return outputFilePath;
    } else {
      console.error('Invalid image dimensions.');
      return null;
    }
  } catch (error) {
    console.error(`Error downloading or resizing image: ${error instanceof Error ? error.message : error}`);
    return null;
  }
}

function getFileNameFromUrl(url: string): string {
  return url.substring(url.lastIndexOf('/') + 1).split('?')[0];
}

export async function parseCSV(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const results: any[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}



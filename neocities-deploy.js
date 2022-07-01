import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import Neocities from 'async-neocities';

const dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), 'build')

async function deploySite () {
  //const token = await Neocities.getKey('sitename', 'password')
  const token = process.env.NEOCITIES_API_KEY;
  const client = new Neocities(token)

  return client.deploy(dirname);
}

await deploySite().then((report) => console.log('successfully uploaded', `\nfiles to upload: ${report.filesToUpload.length}`, `\nfiles to delete: ${report.filesToDelete.length}`,`\nfiles skipped: ${report.filesSkipped.length}`));

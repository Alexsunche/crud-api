import fs from 'fs';
const databasePath = new URL('../data/users-data.json', import.meta.url)
  .pathname;

export const readUsersData = () => {
  try {
    const data = fs.readFileSync(databasePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error('Error reading data from file');
  }
};

import fs from 'fs'
const databasePath = new URL('../data/users-data.json', import.meta.url).pathname;

export const writeUsersData = () => {
    try {
      const data = fs.readFileSync(databasePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading data from file:', error);
    }
  };
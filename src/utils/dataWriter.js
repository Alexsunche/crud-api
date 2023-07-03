import fs from 'fs';
const databasePath = new URL('../data/users-data.json', import.meta.url)
  .pathname;

export const writeUsersData = (data) => {
  try {
    return fs.writeFileSync(
      databasePath,
      JSON.stringify(data, null, 2),
      'utf8',
    );
  } catch (error) {
    throw new Error('Error writing data to file');
  }
};

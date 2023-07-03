const userRequiredFields = ['username', 'age', 'hobbies'];

export function isValidUUID(uuid) {
  const uuidRegex =
    /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
  return uuidRegex.test(uuid);
}

const validateHobbies = (hobbies) => {
    return Array.isArray(hobbies) &&
    hobbies.every((hobby) => typeof hobby === 'string')
}

export const validateUser = (user) => {
  if (
    typeof user === 'object' &&
    user !== null &&
    typeof user.username === 'string' &&
    typeof user.age === 'number' &&
    validateHobbies(user.hobbies)
  ) {
    return true;
  }
  return false;
};

export const isValidFileds = (user) => {
  if (typeof user === 'object' && user !== null) {
    const userFields = Object.keys(user);
    return userFields.every((field) => {
        if(userRequiredFields.includes(field)) {
            if (field === 'hobbies') return validateHobbies(user.hobbies)
            if (field === 'age') return typeof user.age === 'number'
            if (field === 'username') return typeof user.username === 'string'
        }
    });
  }
  return false;
};

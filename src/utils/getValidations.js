export function getValidations(obj, validations = {}) {
  // Check if the current object is an array
  if (Array.isArray(obj)) {
    obj.forEach((item) => getValidations(item, validations));
  } else if (typeof obj === "object" && obj !== null) {
    // Iterate over all properties of the object
    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      // If the key is 'validation', add it to the validations object using the parent key
      if (key === "validation") {
        validations[obj._parentKey] = value;
      }

      // Store the current key as _parentKey before recursing
      if (typeof value === "object" && value !== null) {
        value._parentKey = key;
        getValidations(value, validations);
      }
    });
  }

  return validations;
}

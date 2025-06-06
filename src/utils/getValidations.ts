type Validation = any;

interface ValidatableObject {
  [key: string]: any;
  validation?: Validation;
  readOnly?: boolean;
  _parentKey?: string;
}

export function getValidations(
  obj: ValidatableObject | ValidatableObject[],
  validations: Record<string, Validation> = {}
): Record<string, Validation> {
  if (Array.isArray(obj)) {
    obj.forEach((item) => getValidations(item, validations));
  } else if (typeof obj === "object" && obj !== null) {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      if (key === "validation" && !obj.readOnly && obj._parentKey) {
        validations[obj._parentKey] = value;
      }

      if (typeof value === "object" && value !== null) {
        value._parentKey = key;
        getValidations(value, validations);
      }
    });
  }

  return validations;
}

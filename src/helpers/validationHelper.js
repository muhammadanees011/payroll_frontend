// src/helpers/validationHelper.js
export function validateFormData(formData, optionalFields = []) {
  const errors = {};

  // Loop through each field in the formData object
  Object.keys(formData).forEach((field) => {
    const value = formData[field];
    const fieldName = field.replace(/_/g, ' ');

    // Initialize error message for each field
    if (!errors[field]) {
      errors[field] = '';
    }

    // Skip validation for optional fields
    if (optionalFields.includes(field)) {
      return;
    }

    // Check if the field is an array and is empty
    if (Array.isArray(value) && value.length === 0) {
      errors[field] = `${fieldName} is required.`;
    }
    // Check if the field is null, undefined, or an empty string, but allow 0
    else if (value === null || value === undefined || value === '') {
      errors[field] = `${fieldName} is required.`;
    }
  });

  // Remove fields with no errors
  Object.keys(errors).forEach((field) => {
    if (!errors[field]) {
      delete errors[field];
    }
  });

  return errors;
}

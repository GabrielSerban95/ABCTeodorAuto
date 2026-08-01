export const validateEmail = (value) => /.+@.+\..+/.test(value);

export const validatePhoneRO = (value) => /^0[0-9]{9}$/.test(value.replace(/\s+/g, ''));

export const validateRequired = (value) => Boolean(value?.toString().trim());

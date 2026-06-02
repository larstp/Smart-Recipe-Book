import type { PantryField, PantryErrors } from '../../services/api/types';

export const validatePantryForm = (form: HTMLFormElement): PantryErrors => {
  const formData = new FormData(form);
  const getValue = (key: PantryField) => String(formData.get(key) ?? '').trim();

  const errors: PantryErrors = {};

  if (!getValue('name')) errors.name = 'Name is required.';
  if (!getValue('quantity')) errors.quantity = 'Quantity is required.';
  if (!getValue('unit')) errors.unit = 'Unit is required.';
  if (!getValue('category')) errors.category = 'Category is required.';

  return errors;
};

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Input } from './RecipeForm/Input';
import { Select } from './RecipeForm/Select';
import { Button } from './Button';
import { postNewPantryItem } from '../services/api/pantry';
import { validatePantryForm } from '../lib/helpers/validatePantryItemForm';
import type { PantryItem } from '../services/models';
import type {
  PantryPayload,
  PantryField,
  PantryErrors,
} from '../services/api/types';

type PantryItemFormProps = {
  onSuccess?: (item: PantryItem) => void;
};

export const PantryItemForm = ({ onSuccess }: PantryItemFormProps) => {
  const [errors, setErrors] = useState<PantryErrors>({});
  const [disabled, setDisabled] = useState(false);

  const clearFieldError = (field: PantryField) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const validationErrors = validatePantryForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setDisabled(true);

    try {
      const formData = new FormData(form);
      const payload: PantryPayload = {
        name: String(formData.get('name') ?? '').trim(),
        quantity: Number(formData.get('quantity') ?? 0),
        unit: String(formData.get('unit') ?? '').trim(),
        category: String(formData.get('category') ?? '').trim(),
      };

      const data = await postNewPantryItem(payload);
      toast.success(`Pantry Item added: ${data.name}`);

      form.reset();
      onSuccess?.(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error(`Something went wrong. ${errorMessage}`);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-2">
      <Input
        type="text"
        name="name"
        label="Name"
        placeholder="Name"
        required
        error={errors.name}
        onChange={() => clearFieldError('name')}
      />
      <Input
        type="number"
        name="quantity"
        label="Quantity"
        placeholder="Quantity"
        required
        min={1}
        error={errors.quantity}
        onChange={() => clearFieldError('quantity')}
      />

      <Select
        id="unit"
        name="unit"
        label="Unit"
        options={['piece', 'g', 'ml', 'cup', 'tbsp', 'tsp', 'oz', 'lb']}
        required
        error={errors.unit}
      />

      <Select
        id="category"
        name="category"
        label="Category"
        options={[
          'produce',
          'dairy',
          'protein',
          'grain',
          'spice',
          'condiment',
          'frozen',
          'other',
        ]}
        required
        error={errors.category}
      />

      <Button
        aria-label="Submit"
        type="submit"
        disabled={disabled}
        className="justify-self-end px-4! py-2! transition duration-200 cursor-pointer"
      >
        Submit
      </Button>
    </form>
  );
};

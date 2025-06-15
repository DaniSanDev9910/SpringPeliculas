import React, { useState } from 'react';

/**
 * Custom hook to manage form state and validation
 *
 * Usage:
 * const { values, errors, handleChange, handleSubmit } = useForm({
 *   initialValues: { ... },
 *   validate: (values) => { ... },
 *   onSubmit: (values) => { ... }
 * })
 */
export interface UseFormOptions<T extends Record<string, unknown>> {
  /** Initial shape/values for the form */
  initialValues: T;
  /** Optional validation function that returns an error map */
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  /** Callback executed when the form passes validation */
  onSubmit: (values: T) => void;
}

export function useForm<T extends Record<string, unknown>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value } as T));

    // Clear field error on change
    if (errors[name as keyof T]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let validationErrors: Partial<Record<keyof T, string>> = {};
    if (validate) {
      validationErrors = validate(values);
      setErrors(validationErrors);
    }

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  };

  /** Reset form back to its initial state */
  const reset = () => setValues(initialValues);

  return {
    values,
    errors,
    setValues,
    setErrors,
    handleChange,
    handleSubmit,
    reset,
  } as const;
}

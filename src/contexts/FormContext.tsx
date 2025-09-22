"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";

interface FormContextType {
  formState: Record<string, unknown>;
  setFormState: (state: Record<string, unknown>) => void;
  insertToFormState: (
    v: Record<string, unknown>
  ) => Record<string, unknown> | void;
  clearFormState: () => void;
}

export const FormContext = createContext<FormContextType>({
  formState: {},
  setFormState: () => {},
  insertToFormState: () => {},
  clearFormState: () => {},
});

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formState, setFormState] = useState<Record<string, unknown>>({});

  // insert new data to the state
  const insertToFormState = (v: Record<string, unknown>) => {
    if (!v) return formState;
    const newState = { ...formState, ...v };
    setFormState(newState);
    return newState;
  };

  // clear the state
  const clearFormState = () => {
    setFormState({});
  };

  const value = useMemo(
    () => ({
      formState,
      setFormState,
      insertToFormState,
      clearFormState,
    }),
    [formState]
  );

  // console.log(value);

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

"use client";

import { createContext, useContext, useMemo, useState } from "react";

interface FormContextType {
  formState: Record<string, unknown>;
  insertToFormState: (
    v: Record<string, unknown>
  ) => Record<string, unknown> | void;
  clearFormState: () => void;
}

export const FormContext = createContext<FormContextType>({
  formState: {},
  insertToFormState: (v: Record<string, unknown>) => {},
  clearFormState: () => {},
});

export const useFormState = () => useContext(FormContext);

import { ReactNode } from "react";

export const FormStateProvider = ({ children }: { children: ReactNode }) => {
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
      insertToFormState,
      clearFormState,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formState]
  );

  // console.log(value);

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

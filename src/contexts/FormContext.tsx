import { createContext, useContext, useMemo, useState } from "react";

export const FormContext = createContext({
  formState: {},
  insertToFormState: (v) => {},
  clearFormState: () => {},
});

export const useFormState = () => useContext(FormContext);

export const FormStateProvider = ({ children }) => {
  const [formState, setFormState] = useState({});
  // insert new data to the state
  const insertToFormState = (v) => {
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
    [formState]
  );

  // console.log(value);

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

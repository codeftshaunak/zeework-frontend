export const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: "40px",
  }),
  multiValue: (provided) => ({
    ...provided,
    margin: "3px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "2px 8px",
    flexWrap: "wrap",
    maxHeight: "none",
    overflow: "visible",
  }),
  container: (provided) => ({
    ...provided,
    minHeight: "40px",
    height: "auto",
  }),
};

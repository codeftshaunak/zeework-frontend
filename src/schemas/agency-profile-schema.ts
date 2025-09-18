import * as yup from "yup";

export const overviewSchema = yup.object().shape({
  agency_overview: yup
    .string()
    .required("Overview is required")
    .test(
      "is-empty",
      "Overview cannot be empty",
      (value) => !isQuillEmpty(value)
    ),
});

const isQuillEmpty = (value) => {
  const strippedValue = value.replace(/<\/?[^>]+(>|$)/g, "").trim();
  return strippedValue.length === 0;
};

import * as yup from "yup";

// Constants for file validation
// const MAX_FILE_SIZE = 100 * 1024 * 1024;
// const ACCEPTED_FILE_TYPES = [];

const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

// First step schema
export const firstStepSchema = yup.object().shape({
  title: yup.string().min(1, "Title is required").required("Title is required"),

  description: yup
    .string()
    .required("Description is required")
    .test(
      "not-empty",
      "Description cannot be empty",
      (value) => stripHtml(value).length > 0
    ),

  categories: yup
    .array(
      yup.object().shape({
        _id: yup.string().required(),
        value: yup.string().required(),
        label: yup.string().required(),
      })
    )
    .min(1, "At least one category is required")
    .required("Categories are required"),

  skills: yup
    .array(yup.string().required())
    .min(1, "At least one skill is required")
    .required("Skills are required"),

  job_type: yup
    .string()
    .min(1, "Job type is required")
    .required("Job type is required"),

  amount: yup
    .string()
    .required("Amount is required")
    .test("is-valid-number", "Valid amount is required", (value) => {
      const number = parseFloat(value);
      return !isNaN(number) && number > 0;
    }),

  // Uncomment and update the following if you need file validation
  // file: yup
  //   .mixed()
  //   .test('is-file', 'Expected a file', (file) => file instanceof File)
  //   .test('file-size', `File must be less than ${MAX_FILE_SIZE / (1024 * 1024)} MB`, (file) => {
  //     return typeof file === "string" || file.size <= MAX_FILE_SIZE;
  //   })
  //   .test('file-type', 'Unsupported file format', (file) => {
  //     return typeof file === "string" || ACCEPTED_FILE_TYPES.includes(file.type);
  //   })
  //   .optional(),
});

// Second step schema
export const secondStepSchema = yup.object().shape({
  experience: yup
    .mixed()
    .oneOf(["Entry", "Intermediate", "Expert"])
    .required("Experience is required"),
});

// Third step schema
export const thirdStepSchema = yup.object().shape({
  durations: yup.string().required("Duration is required"),
});

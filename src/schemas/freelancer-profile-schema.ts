import * as yup from "yup";

export const educationSchema = yup.object().shape({
  degree_name: yup.string().required("Degree Name is required"),
  institution: yup.string().required("Institution is required"),
  start_date: yup
    .date()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : new Date(originalValue);
    })
    .required("Start Date is required")
    .max(new Date(), "Start Date cannot be in the future")
    .typeError("Start Date must be a valid date"),
  end_date: yup
    .date()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : new Date(originalValue);
    })
    .required("End Date is required")
    .typeError("End Date must be a valid date")
    .min(yup.ref("start_date"), "End Date must be after Start Date")
    .test("is-greater", "End Date must be after Start Date", function (value) {
      const { start_date } = this.parent;
      return start_date && value && new Date(value) > new Date(start_date);
    })
    .max(new Date(), "End Date cannot be in the future"),
});

export const experienceSchema = yup.object().shape({
  company_name: yup.string().required("Company Name is required"),
  start_date: yup
    .date()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : new Date(originalValue);
    })
    .required("Start Date is required")
    .max(new Date(), "Start Date cannot be in the future")
    .typeError("Start Date must be a valid date"),
  end_date: yup
    .date()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : new Date(originalValue);
    })
    .required("End Date is required")
    .typeError("End Date must be a valid date")
    .min(yup.ref("start_date"), "End Date must be after Start Date")
    .test("is-greater", "End Date must be after Start Date", function (value) {
      const { start_date } = this.parent;
      return start_date && value && new Date(value) > new Date(start_date);
    })
    .max(new Date(), "End Date cannot be in the future"),
  position: yup.string().required("Position is required"),
  job_location: yup.string().required("Location is required"),
  job_description: yup.string().required("Description is required"),
});

export const portfolioSchema = yup.object().shape({
  project_name: yup.string().required("Project Name is required"),
  project_description: yup.string().required("Project Description is required"),
  technologies: yup
    .array()
    .min(1, "Please include the technologies used")
    .required("Technologies are required"),
  images: yup
    .mixed()
    .test(
      "fileSize",
      "You can't add to your portfolio without project images",
      (value: any) => value && value.length > 0
    ),
});

export const basicInfoSchema = yup.object().shape({
  professional_role: yup.string().required("Professional role is required"),
  hourly_rate: yup
    .number()
    .typeError("Hourly rate must be a number")
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .required("Hourly rate is required")
    .positive("Hourly rate must be positive"),
  description: yup
    .string()
    .test("description", "Description is required", (value: any) => {
      if (!value) return false;
      const strippedString = value.replace(/<\/?[^>]+(>|$)/g, "").trim();
      return strippedString.length > 0;
    }),
});

export const skillsSchema = yup.object().shape({
  skills: yup
    .array()
    .min(5, "Select at least five skills")
    .max(15, "You can select up to fifteen skills")
    .required("Skills are required"),
});

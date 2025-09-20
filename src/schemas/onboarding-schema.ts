import * as Yup from "yup";

const categorySchema = Yup.object().shape({
  categories: Yup.array()
    .min(1, "At least select a category")
    .required("Category is required"),
  sub_categories: Yup.array()
    .min(1, "At least select a sub category")
    .required("Sub category is required"),
});

const infoSchema = Yup.object().shape({
  professional_role: Yup.string()
    .required("Add your professional role")
    .matches(/^[A-Z]/, "First character must be uppercase")
    .min(10, "Professional role too short (minimum 10 characters)")
    .max(80, "Professional role too long (maximum 80 characters)"),
  hourly_rate: Yup.number()
    .positive("Hourly rate must be greater than 0")
    .required("Add your hourly rate"),
  description: Yup.string()
    .required("Add Your Profile Overview")
    .min(200, "Profile Overview too short (minimum 200 characters)")
    .max(5000, "Profile Overview too long (maximum 5000 characters)"),
});

const skillsSchema = Yup.object().shape({
  skills: Yup.array()
    .min(5, "Select at least 5 skills to showcase your expertise")
    .required("Skills are required"),
});

export const onboardingFreelancerSchema = {
  category: categorySchema,
  info: infoSchema,
  skills: skillsSchema,
};

export const onboardingClientSchema = Yup.object().shape({
  business_name: Yup.string()
    .required("Add your business name please")
    .matches(/^[A-Z]/, "First character must be uppercase"),
  brief_description: Yup.string()
    .required("Add your business details")
    .matches(/^[A-Z]/, "First character must be uppercase"),
});

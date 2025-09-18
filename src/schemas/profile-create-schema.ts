import * as yup from "yup";

export const freelancerSignUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(
      /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/,
      "First name must start with an uppercase letter"
    ),

  lastName: yup
    .string()
    .required("Last name is required")
    .matches(
      /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/,
      "Last name must start with an uppercase letter"
    ),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  country: yup.string().required("Country is required"),
  sendEmails: yup.boolean(),
  has_accepted_terms: yup
    .boolean()
    .oneOf([true], "You must accept the Terms of Services"),
});

export const clientSignUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(
      /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/,
      "First name must start with an uppercase letter"
    ),
  lastName: yup
    .string()
    .required("Last name is required")
    .matches(
      /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/,
      "Last name must start with an uppercase letter"
    ),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  country: yup.string().required("Country is required"),
  sendEmails: yup.boolean(),
  has_accepted_terms: yup
    .boolean()
    .oneOf([true], "You must accept the Terms of Services"),
});

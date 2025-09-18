import * as yup from "yup";

export const paypalCardSchema = yup.object().shape({
  card_number: yup
    .string()
    .required("Card number is required")
    .test("valid-card-number", "Please enter a valid card number", (value) => {
      const cleanedValue = value.replace(/\s+/g, "");
      return /^[0-9]{13,19}$/.test(cleanedValue);
    }),

  expiry: yup
    .string()
    .required("Expiration date is required")
    .matches(
      /^(0[1-9]|1[0-2])\/\d{4}$/,
      "Please use MM/YYYY format (e.g., 05/2026)"
    )
    .test("not-expired", "Card has expired", (value) => {
      if (!value) return false;
      const [monthStr, yearStr] = value.split("/");
      const expMonth = parseInt(monthStr, 10);
      const expYear = parseInt(yearStr, 10);

      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      return (
        expYear > currentYear ||
        (expYear === currentYear && expMonth >= currentMonth)
      );
    }),
  security_code: yup
    .string()
    .required("CVV is required")
    .matches(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits"),

  first_name: yup
    .string()
    .required("First name is required")
    .matches(/^[A-Z]/, "First character must be uppercase")
    .matches(/^\S*$/, "White spaces are not allowed")
    .matches(/^[a-zA-Z\s]*$/, "Only letters are allowed"),

  last_name: yup
    .string()
    .required("Last name is required")
    .matches(/^[A-Z]/, "First character must be uppercase")
    .matches(/^\S*$/, "White spaces are not allowed")
    .matches(/^[a-zA-Z\s]*$/, "Only letters are allowed"),

  address_line1: yup
    .string()
    .required("Address line 1 is required")
    .max(200, "Address must be less than 200 characters"),

  city: yup
    .string()
    .required("City is required")
    .max(100, "City must be less than 100 characters"),

  state: yup
    .string()
    .required("State/Province is required")
    .max(100, "State must be less than 100 characters"),

  zip: yup
    .string()
    .required("Postal code is required")
    .max(20, "Postal code must be less than 20 characters"),

  country_code: yup
    .string()
    .required("Country is required")
    .length(2, "Country code must be 2 characters"),
});

export const billingSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(/^[A-Z]/, "First character must be uppercase")
    .matches(/^\S*$/, "White spaces are not allowed")
    .matches(/^[a-zA-Z\s]*$/, "Only letters are allowed"),
  lastName: yup
    .string()
    .required("Last name is required")
    .matches(/^[A-Z]/, "First character must be uppercase")
    .matches(/^\S*$/, "White spaces are not allowed")
    .matches(/^[a-zA-Z\s]*$/, "Only letters are allowed"),
  address_country: yup.string().required("Country is required"),
  address_city: yup.string().required("City is required"),
  address_zip: yup.string().required("Postal code is required"),
  address_line1: yup.string().required("Address line 1 is required"),
});

export const addBankSchema = yup
  .object()
  .shape({
    bank_name: yup.string(),
    account_number: yup.string(),
    iban: yup.string(),
    sort_code: yup.string(),
    routing_number: yup.string(),
    bic_swift_code: yup.string(),
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    country: yup.string().required("Country name is required"),
    personal_details: yup.string().optional(),
  })
  .test(
    "account-or-iban-required",
    "Either account number or IBAN must be provided",
    function (values) {
      const { account_number, iban } = values || {};
      if (!account_number && !iban) {
        return this.createError({
          path: "account_or_iban",
          message: "Either account number or IBAN must be provided",
        });
      }
      return true;
    }
  );

export const addPaypalSchema = yup.object().shape({
  email: yup.string().required("Paypal email is required"),
});

export const addPayoneerSchema = yup.object().shape({
  email: yup.string().required("Payoneer email is required"),
});

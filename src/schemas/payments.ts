import * as yup from "yup";

export 
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

      }
      return true;
    }
  );

export 
export 
import * as yup from "yup";

export 
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

    })
    .max(new Date(), "End Date cannot be in the future"),
});

export 
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

    })
    .max(new Date(), "End Date cannot be in the future"),
  position: yup.string().required("Position is required"),
  job_location: yup.string().required("Location is required"),
  job_description: yup.string().required("Description is required"),
});

export 
export 
      return strippedString.length > 0;
    }),
});

export 
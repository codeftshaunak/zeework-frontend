import ChangeOldPassword from "../CommonSettings/ChangeOldPassword";
import BillingAndPayment from "./BillingAndPayment/BillingAndPayment";
import ContactInfo from "./ContactInfo/ContactInfo";

const FreelancerSettings = ({ step }) => {
  return (
    <>
      {step === "password" && <ChangeOldPassword />}
      {step === "billing-payments" && <BillingAndPayment />}
      {step === "contact-info" && <ContactInfo />}
    </>
  );
};

export default FreelancerSettings;

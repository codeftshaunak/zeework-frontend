import BillingAndPayments from "./BillingAndPayments/BillingAndPayment";
import ChangeOldPassword from "../CommonSettings/ChangeOldPassword";
import ContactInfo from "./ContactInfo/ContactInfo";

const ClientSettings = ({ step }) => {
  return (
    <>
      {step === "password" && <ChangeOldPassword />}
      {step === "billing-payments" && <BillingAndPayments />}
      {step === "contact-info" && <ContactInfo />}
    </>
  );
};

export default ClientSettings;

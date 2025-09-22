"use client";

import { useSelector } from "react-redux";
import { ClientProfilePage } from "./ClientProfilePage";
import AgencyProfile from "../AgencyUI/AgencyProfile";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import { FreelancerProfile } from "./FreelancerProfile/FreelancerProfile/FreelancerProfile";
import { ModernFreelancerProfile } from "./FreelancerProfile/ModernFreelancerProfile";
import { useParams } from "next/navigation";
import ViewFreelancerProfile from "../PublicProfile/Freelancer/ViewFreelancerProfile";
import ViewAgencyProfile from "../PublicProfile/Agency/ViewAgencyProfile";
import DataNotAvailable from "../DataNotAvailable/DataNotAvailable";

export 
const UserProfile = () => {
  const { user_id, agency_profile } = useSelector(
    (state) => state.profile.profile
  );
  const { id, profile } = useParams();

  const isAuthorized = profile === "a" ? agency_profile === id : user_id === id;

  return (
    <div className="w-[100%] m-auto">
      {/* agency profile */}
      {profile === "a" &&
        (isAuthorized ? <AgencyProfile /> : <ViewAgencyProfile />)}

      {/* freelancer profile */}
      {profile === "f" &&
        (isAuthorized ? <ModernFreelancerProfile /> : <ViewFreelancerProfile />)}

      {/* client profile */}
      {profile === "c" &&
        (isAuthorized ? <ClientProfilePage /> : <DataNotAvailable />)}
    </div>
  );
};

export default UserProfile;

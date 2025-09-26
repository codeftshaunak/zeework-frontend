"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDetailsOfUser } from "../helpers/APIs/userApis";
import { useCookies } from "react-cookie";
import { agencyData, profileData } from "../redux/authSlice/profileSlice";
import { getAgency } from "../helpers/APIs/agencyApis";
import { RootState } from "../redux/store";
import { User, Agency } from "../types";

interface CurrentUserContextType {
  profile: any;
  agency: Agency | null;
  hasAgency: boolean;
  activeAgency: any;
  getUserDetails: () => void;
  userAgencyLoading: boolean;
}

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

interface CurrentUserProviderProps {
  children: ReactNode;
}

const CurrentUserProvider = ({ children }: CurrentUserProviderProps) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const agency = useSelector((state: RootState) => state.profile.agency);
  const [cookies, setCookie] = useCookies(["activeagency"]);
  const [userAgencyLoading, setUserAgencyLoading] = useState(false);
  const activeAgency = cookies.activeagency;
  const hasAgency = profile?.profile?.agency_profile;

  const getUserDetails = async () => {
    try {
      setUserAgencyLoading(true);
      const authToken = localStorage.getItem("authtoken");
      // Fetch user details
      const userDetailsResponse = authToken ? await getAllDetailsOfUser() : {};
      const { body: userDetails, code: userCode } = userDetailsResponse;
      if (userCode === 200) dispatch(profileData({ profile: userDetails }));

      // Fetch agency details
      if (profile?.profile?.role === 1 && authToken) {
        const agencyDetailsResponse = await getAgency();
        const { body: agencyDetails, code: agencyCode } = agencyDetailsResponse;
        if (agencyCode === 200) dispatch(agencyData({ agency: agencyDetails }));
      }

      setUserAgencyLoading(false);
    } catch (error) {
      setUserAgencyLoading(false);
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [profile?.profile?.role]);

  return (
    <CurrentUserContext.Provider
      value={{
        profile,
        agency: agency || null,
        hasAgency,
        activeAgency,
        getUserDetails,
        userAgencyLoading,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserProvider, CurrentUserContext };

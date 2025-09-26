"use client";
import React, { useEffect, useState, useCallback } from "react";
import { BsPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { IoLogoGithub, IoLogoStackoverflow } from "react-icons/io5";

import UniversalModal from "../../../../Modals/UniversalModal";
import {
  getGithubProfile,
  githubAccessToken,
  stackOverflowAccessToken,
  getStackOverflowProfile,
} from "../../../../../helpers/APIs/userApis";
import ProfilesCard from "./ProfilesCard/ProfilesCard";
import BtnSpinner from "../../../../Skeletons/BtnSpinner";
import { profileData } from "../../../../../redux/authSlice/profileSlice";

// Types
interface LinkedAccount {
  user_id: string;
  [key: string]: any; // Allow for additional properties
}

interface ProfileState {
  profile: {
    linked_accounts?: LinkedAccount[];
  };
}

interface RootState {
  profile: ProfileState;
}

interface OAuthResponse {
  body?: {
    access_token?: string;
  };
}

interface ProfileResponse {
  code?: number;
  body?: any;
}

// Component
const LinkedAccounts: React.FC = () => {
  const dispatch = useDispatch();
  const linkedAccounts = useSelector(
    (state: RootState) => state.profile.profile.linked_accounts || []
  );

  const [isModal, setIsModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStackOverflowLoading, setIsStackOverflowLoading] =
    useState<boolean>(false);

  const getCodeFromQuery = useCallback((): {
    code: string | null;
    provider: string | null;
  } => {
    if (typeof window === "undefined") return { code: null, provider: null };

    const params = new URLSearchParams(window.location.search);
    return { code: params.get("code"), provider: params.get("p") };
  }, []);

  // GitHub OAuth
  const handleConnectGithub = (): void => {
    setIsLoading(true);
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const profileURL = `${window.location.origin}${window.location.pathname}?p=github`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(profileURL)}&scope=user`;
    window.location.href = githubAuthUrl;
  };

  // StackOverflow OAuth
  const handleConnectStackOverflow = (): void => {
    setIsStackOverflowLoading(true);
    const clientId = process.env.NEXT_PUBLIC_STACKOVERFLOW_CLIENT_ID;
    const profileURL = `${window.location.origin}${window.location.pathname}?p=stackoverflow`;
    const stackOverflowAuthUrl = `https://stackoverflow.com/oauth?client_id=${clientId}&redirect_uri=${encodeURIComponent(profileURL)}&scope=no_expiry`;
    window.location.href = stackOverflowAuthUrl;
  };

  // Fetch access token and user profile
  const fetchAccessTokenAndUserProfile = useCallback(
    async (
      provider: string,
      accessTokenFn: (params: { code: string }) => Promise<OAuthResponse>,
      getProfileFn: (params: {
        accessToken: string;
      }) => Promise<ProfileResponse>,
      setLoadingFn: React.Dispatch<React.SetStateAction<boolean>>
    ): Promise<void> => {
      const { code, provider: queryProvider } = getCodeFromQuery();

      if (code && provider === queryProvider) {
        try {
          const response = await accessTokenFn({ code });
          const accessToken = response?.body?.access_token;

          if (accessToken) {
            const profileResponse = await getProfileFn({ accessToken });
            if (profileResponse?.code === 200) {
              dispatch(profileData({ profile: profileResponse.body }));

              // Clean URL
              const url = new URL(window.location.href);
              url.searchParams.delete("code");
              url.searchParams.delete("p");
              window.history.replaceState({}, document.title, url.toString());
            }
          }
        } catch (error) {
          console.error(`${provider} OAuth failed:`, error);
        } finally {
          setLoadingFn(false);
        }
      }
    },
    [dispatch, getCodeFromQuery]
  );

  useEffect(() => {
    fetchAccessTokenAndUserProfile(
      "github",
      githubAccessToken,
      getGithubProfile,
      setIsLoading
    );
  }, [fetchAccessTokenAndUserProfile]);

  useEffect(() => {
    fetchAccessTokenAndUserProfile(
      "stackoverflow",
      stackOverflowAccessToken,
      getStackOverflowProfile,
      setIsStackOverflowLoading
    );
  }, [fetchAccessTokenAndUserProfile]);

  return (
    <>
      <div className="flex flex-col gap-6 border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg bg-white">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold text-gray-800">Linked Accounts</p>
          <div
            className="flex items-center justify-center bg-gray-100 border border-gray-200 rounded-md cursor-pointer w-7 h-7"
            onClick={() => setIsModal(true)}
          >
            <BsPlus />
          </div>
        </div>

        {linkedAccounts.length > 0 && (
          <div className="p-3 rounded-md bg-slate-50">
            {linkedAccounts.map((item: LinkedAccount) => (
              <ProfilesCard key={item.user_id} data={item} isPublic={false} />
            ))}
          </div>
        )}
      </div>

      <UniversalModal isModal={isModal} setIsModal={setIsModal}>
        <p className="mb-5 text-2xl font-semibold text-gray-800">
          Select Your Account
        </p>

        <div className="flex flex-wrap justify-center gap-10 px-5 py-10 rounded-md bg-slate-100">
          {/* GitHub Button */}
          <button
            className="inline-flex items-center justify-center px-4 py-2 text-sm text-2xl font-medium text-white transition-colors bg-black rounded-md hover:bg-accent hover:text-accent-foreground"
            onClick={handleConnectGithub}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <BtnSpinner />
                <span className="ml-2">Connecting...</span>
              </>
            ) : (
              <>
                <IoLogoGithub className="mr-2" />
                <span>Connect GitHub</span>
              </>
            )}
          </button>

          {/* StackOverflow Button */}
          <button
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground text-2xl bg-[#f48024] text-white px-4 py-2"
            onClick={handleConnectStackOverflow}
            disabled={isStackOverflowLoading}
          >
            {isStackOverflowLoading ? (
              <>
                <BtnSpinner />
                <span className="ml-2">Connecting...</span>
              </>
            ) : (
              <>
                <IoLogoStackoverflow className="mr-2" />
                <span>Connect StackOverflow</span>
              </>
            )}
          </button>
        </div>
      </UniversalModal>
    </>
  );
};

export default LinkedAccounts;

"use client";

import { BsPlus } from "react-icons/bs";
import { useEffect, useState, useCallback } from "react";
import UniversalModal from "../../../../Modals/UniversalModal";
import {
  getGithubProfile,
  githubAccessToken,
  stackOverflowAccessToken,
  getStackOverflowProfile,
} from "../../../../../helpers/APIs/userApis";
import { useDispatch, useSelector } from "react-redux";
import ProfilesCard from "./ProfilesCard/ProfilesCard";
import { Button, StackDivider, VStack } from "@chakra-ui/react";
import { IoLogoGithub, IoLogoStackoverflow } from "react-icons/io5";
import BtnSpinner from "../../../../Skeletons/BtnSpinner";
import { profileData } from "../../../../../redux/authSlice/profileSlice";

const LinkedAccounts = () => {
  const dispatch = useDispatch();
  const linkedAccounts =
    useSelector((state: any) => state.profile.profile.linked_accounts) || [];
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStackOverflowLoading, setIsStackOverflowLoading] = useState(false);

  const getCodeFromQuery = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    return { code: params.get("code"), provider: params.get("p") };
  }, []);

  // GitHub OAuth
  const handleConnectGithub = () => {
    setIsLoading(true);
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const profileURL = `${window.location.origin}${window.location.pathname}?p=github`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${profileURL}&scope=user`;
    window.location.href = githubAuthUrl;
  };

  // StackOverflow OAuth
  const handleConnectStackOverflow = () => {
    setIsStackOverflowLoading(true);
    const clientId = import.meta.env.VITE_STACKOVERFLOW_CLIENT_ID;
    const profileURL = `${window.location.origin}${window.location.pathname}?p=stackoverflow`;
    const stackOverflowAuthUrl = `https://stackoverflow.com/oauth?client_id=${clientId}&redirect_uri=${profileURL}&scope=no_expiry`;
    window.location.href = stackOverflowAuthUrl;
  };

  // Fetch access token and user profile
  const fetchAccessTokenAndUserProfile = useCallback(
    async (provider, accessTokenFn, getProfileFn, setLoadingFn) => {
      const { code, provider: queryProvider } = getCodeFromQuery();
      if (code && provider === queryProvider) {
        try {
          const response = await accessTokenFn({ code });
          const accessToken = response?.body?.access_token;
          if (accessToken) {
            const profileResponse = await getProfileFn({ accessToken });
            if (profileResponse?.code === 200) {
              dispatch(profileData({ profile: profileResponse.body }));
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
          <p className="text-xl text-gray-800 font-semibold">Linked Accounts</p>
          <div
            className="flex items-center justify-center w-7 h-7 bg-gray-100 rounded-md border border-gray-200 cursor-pointer"
            onClick={() => setIsModal(true)}
          >
            <BsPlus />
          </div>
        </div>
        {linkedAccounts.length > 0 && (
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
            className="bg-slate-50 rounded-md p-3"
          >
            {linkedAccounts.map((item) => (
              <ProfilesCard key={item.user_id} data={item} />
            ))}
          </VStack>
        )}
      </div>

      <UniversalModal isModal={isModal} setIsModal={setIsModal}>
        <p className="text-2xl font-semibold text-gray-800 mb-5">
          Select Your Account
        </p>
        <div className="flex gap-10 flex-wrap justify-center py-10 px-5 bg-slate-100 rounded-md">
          <Button
            leftIcon={<IoLogoGithub className="text-2xl" />}
            onClick={handleConnectGithub}
            bgColor={"black"}
            _hover={{ bgColor: "#262626" }}
            textColor={"white"}
            rounded={"full"}
            isLoading={isLoading}
            loadingText={"Connect"}
            spinner={<BtnSpinner />}
          >
            Connect
          </Button>
          <Button
            leftIcon={<IoLogoStackoverflow className="text-2xl" />}
            onClick={handleConnectStackOverflow}
            bgColor={"#f08424"}
            _hover={{ bgColor: "##cf8748" }}
            textColor={"white"}
            rounded={"full"}
            isLoading={isStackOverflowLoading}
            loadingText={"Connect"}
            spinner={<BtnSpinner />}
          >
            Connect
          </Button>
        </div>
      </UniversalModal>
    </>
  );
};

export default LinkedAccounts;

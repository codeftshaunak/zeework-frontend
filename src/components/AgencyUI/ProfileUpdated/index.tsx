"use client";


import { useCallback, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select/creatable";
import {
  getCategories,
  getSkills,
  getSubCategory,
} from "../../../helpers/APIs/freelancerApis";
import {
  updateAgencyProfile,
  uploadSingleImage,
} from "../../../helpers/APIs/agencyApis";
import { State, City } from "country-state-city";
import { useSelector, useDispatch } from "react-redux";
import UniversalModal from "../../Modals/UniversalModal";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <div className="h-32 bg-gray-100 rounded border animate-pulse" />
});
import QuillToolbar, {
  formats,
  modules,
} from "../../utils/QuillToolbar/QuillToolbar";
import BtnSpinner from "../../Skeletons/BtnSpinner";
import { agencyData } from "../../../redux/authSlice/profileSlice";

export function AgencyUpdatedModal({
  isModal,
  setIsModal,
  title,
  data,
  setAgency,
}) {
  const [isLading, setIsLoading] = useState(false);
  const { control, register, handleSubmit, reset } = useForm();
  const [categoriesInfo, setCategoriesInfo] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedImage, setSelectedImage] = useState({});
  const [overview, setOverview] = useState(title === "Overview" ? data : "");
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [stateCode, setStateCode] = useState({});
  const { name: countryName, code: countryCode } = useSelector(
    (state) => state?.profile?.agency?.agency_location
  );
  const dispatch = useDispatch();

  // update profile photo
  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  // Memoize the setOverview function
  const handleOverviewChange = useCallback((value) => {
    const removeTrailingEmptyTags = value.replace(
      /(<p(?: class="ql-align-justify")?\s*>\s*<br\s*\/?>\s*<\/p>\s*)+$/,
      ""
    );
    setOverview(removeTrailingEmptyTags);
  }, []);

  // handle update info
  const onSubmit = async (data) => {
    setIsLoading(true);
    const updatedData =
      title === "Sub Category"
        ? {
            agency_services: JSON.parse(data.agency_services),
          }
        : title === "Overview"
        ? { agency_overview: overview }
        : data;

    try {
      if (title === "Profile Photo" || title === "Cover Photo") {
        const formData = new FormData();
        formData.append("imageFile", selectedImage);
        const { body: imgBody, code } = await uploadSingleImage(formData);
        if (code === 200) {
          const { body } = await updateAgencyProfile(
            title === "Profile Photo"
              ? { agency_profileImage: imgBody.imageUrl }
              : { agency_coverImage: imgBody.imageUrl }
          );
          setAgency(body);
          if (code === 200) dispatch(agencyData({ agency: body }));
        }
      } else {
        const { body, code } = await updateAgencyProfile(updatedData);
        setAgency(body);
        if (code === 200) dispatch(agencyData({ agency: body }));
      }
      setIsModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsModal(false);
      setIsLoading(false);
    }
    reset();
  };

  // -------- Manage Services
  const getService = async () => {

      if (code === 200)
        setCategoriesInfo({ ...categoriesInfo, categories: body });
    } else if (categoriesInfo?.selectedId) {
      const { body, code } = await getSubCategory(categoriesInfo?.selectedId);
      if (code === 200) setSubCategories(body);
    }
  };

  // --------- Manage Skills
  const getAllSkills = async () => {
    if (title === "Skills" || title === "Projects") {
      try {
        const { body, code } = await getSkills(data?.category, data?.category);
        if (code === 200)
          setSkills(
            body?.map((item) => ({
              label: item.skill_name,
              value: item.skill_name,
            }))
          );
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getService();
    if (title === "Skills" || title === "Projects") getAllSkills();
  }, [categoriesInfo]);

  // manage agency location
  useEffect(() => {
    if (title === "Office Location") {
      setStateData(
        State.getStatesOfCountry(countryCode).map((state) => ({
          value: state.name,
          label: state.name,
          isoCode: state.isoCode,
        }))
      );
      setCityData(
        City.getCitiesOfState(countryCode, stateCode || "").map((city) => ({
          value: city.name,
          label: city.name,
        }))
      );
    }
  }, [countryCode, stateCode, title]);

  return (
    <UniversalModal
      isModal={isModal}
      setIsModal={setIsModal}
      title={`Update ${title}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5">
          {/* header of agency profile */}
          {/* update profile photo */}
          {(title === "Profile Photo" || title === "Cover Photo") && (
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col">
                <div className="flex flex-col gap-[2px]">
                  <div className="w-[100%] py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                    <input
                      required
                      type="file"
                      className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)]"
                      placeholder="Your Company Name"
                      name="agency_profileImage"
                      onChange={(e) => handleProfileImage(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* update agency name */}
          {title === "Agency Name" && (
            <input
              type="text"
              {...register("agency_name")}
              required
              defaultValue={data}
              className="px-3 py-1 border rounded w-full"
            />
          )}
          {/* update agency tagline */}
          {title === "Agency Tagline" && (
            <input
              type="text"
              {...register("agency_tagline")}
              required
              defaultValue={data}
              className="px-3 py-1 border rounded w-full"
            />
          )}

          {/* -----------Left Side of Agency Profile */}
          {/* update overview */}
          {title === "Overview" && (
            <div >
              <QuillToolbar />
              <ReactQuill
                theme="snow"
                value={overview}
                onChange={handleOverviewChange}
                className="h-64 [&>*]:rounded-b-md"
                modules={modules}
                formats={formats}
              />
            </div>
          )}
          {/* update services */}
          {title === "Services" && (
            <>
              <p className="font-semibold">Select Category</p>
              <select
                className="px-3 py-1 border rounded w-full"
                {...register("agency_services.category", {
                  onChange: (e) => {
                    setCategoriesInfo({
                      ...categoriesInfo,
                      selectedId: e.target.value,
                    });

                          } else {
                            onChange(val.value), setStateCode(val.isoCode);
                          }
                        }}
                        options={[
                          ...(stateData || []),
                          {
                            label: "Add new state",
                            value: "__create_new_field__",
                          },
                        ]}
                        required
                      />
                    )}
                  />
                </div>
                <div className="w-1/2">
                  <p>Select City</p>
                  <Controller
                    control={control}
                    name="agency_officeLocation.street"
                    render={({ field: { onChange, ref } }) => (
                      <Select
                        className="w-full"
                        inputRef={ref}
                        onChange={(val, action) => {
                          if (action.action === "create-option") {
                            onChange(action.option.value);
                          } else {
                            onChange(val.value);
                          }
                        }}
                        options={[
                          ...(cityData || []),
                          {
                            label: "Add new city",
                            value: "__create_new_field__",
                          },
                        ]}
                        required
                        isDisabled={!stateCode}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="mt-3">
                <p>Address</p>
                <input
                  className="w-full px-2 py-1 border rounded"
                  type="text"
                  {...register("agency_officeLocation.address")}
                />
              </div>
            </div>
          )}
          {/* update company info */}
          {title === "Agency Size" && (
            <input
              type="number"
              {...register("agency_size")}
              defaultValue={Number(data)}
              required
              className="px-3 py-1 border rounded w-full"
            />
          )}
          {title === "Founded" && (
            <input
              type="date"
              defaultValue={data}
              {...register("agency_foundedYear")}
              className="px-3 py-1 border rounded w-full"
              required
            />
          )}
          {title === "Focus" && <p>Coming Soon</p>}
          {title === "Language" && <p>Coming Soon</p>}
        </div>

        <div className="text-right mt-10">
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            isLoading={isLading}
            loadingText="Submit"
            type="submit"
            spinner={<BtnSpinner />}
          >
            Submit
          </button>
        </div>
      </form>
    </UniversalModal>
  );
}

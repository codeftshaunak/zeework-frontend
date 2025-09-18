import {
  Avatar,
  Box,
  Button,
  HStack,
  Image,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useCookies } from "react-cookie";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import { useForm } from "react-hook-form";
import { BiImages, BiSolidCrop } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {
  RiDeleteBin2Fill,
  RiEdit2Fill,
  RiUploadCloud2Fill,
} from "react-icons/ri";
import { TiArrowBack, TiMinus, TiPlus, TiZoom } from "react-icons/ti";
import { useDispatch } from "react-redux";
import {
  updateAgencyProfile,
  uploadSingleImage,
} from "../../helpers/APIs/agencyApis";
import getCroppedImg from "../../helpers/manageImages/getCroppedImg";
import { clearMessageState } from "../../redux/messageSlice/messageSlice";
import { clearNotificationState } from "../../redux/notificationSlice/notificationSlice";
import { clearPagesState } from "../../redux/pagesSlice/pagesSlice";
import UniversalModal from "../Modals/UniversalModal";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { AgencyBodyLayout } from "./AgencyBody";
import { useNavigate } from "next/navigation";
import { compressImageToWebP } from "../../helpers/manageImages/imageCompressed";

const AgencyProfileHeader = ({ agency, setAgency }) => {
  const {
    agency_name,
    agency_tagline,
    agency_coverImage,
    agency_profileImage,
    user_id,
  } = agency || {};

  // agency active
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(["activeagency"]);
  const [isModal, setIsModal] = useState(false);
  const [modalType, setIsModalType] = useState("");
  const [modalData, setModalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  // include drag and drop with photo cropping features
  const [fileName, setFileName] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [fullImage, setFullImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isCropped, setIsCropped] = useState(false);

  // handle photo drag 'n' drop with photo cropping
  const onDrop = useCallback((acceptedFiles) => {
    setFullImage(acceptedFiles);
    setFileName(acceptedFiles[0].name);
    setErrorMessage("");

    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      setImageSrc(reader.result);
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    multiple: false,
  });

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    try {
      if (!imageSrc || !croppedAreaPixels) {
        setErrorMessage("Please select and crop an image before uploading.");
        return;
      }

      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      const file = new File([croppedImage], fileName, { type: "image/jpeg" });
      setCroppedImage([file]);
      setIsCropped(true);
    } catch (e) {
      console.error(e);
      setErrorMessage("An error occurred while cropping the image.");
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (modalType === "Profile Photo" || modalType === "Cover Photo") {
        const formData = new FormData();
        const compressedImage = await compressImageToWebP(
          isCropped ? croppedImage?.[0] : fullImage?.[0]
        );

        formData.append("imageFile", compressedImage);

        const { body: imgBody, code: imgCode } = await uploadSingleImage(
          formData
        );
        if (imgCode === 200) {
          const { code, body } = await updateAgencyProfile(
            modalType === "Profile Photo"
              ? { agency_profileImage: imgBody.imageUrl }
              : { agency_coverImage: imgBody.imageUrl }
          );

          if (code === 200) {
            setAgency(body);
          }
        }
      } else {
        const { body, code } = await updateAgencyProfile(data);
        if (code === 200) setAgency(body);
      }
    } catch (error) {
      console.error(error);
    }

    reset();
    setIsModal(false);
    setIsLoading(false);
    setImageSrc(null);
    setFileName("");
    setCroppedImage(null);
    setFullImage(null);
    setIsCropped(false);
  };

  // handle open modal
  const handleUpdate = (type, data) => {
    setImageSrc(null);
    setFileName("");
    setCroppedImage(null);
    setFullImage(null);
    setIsCropped(false);
    setIsModalType(type);
    setModalData(data);
    setIsModal(true);
  };

  const handleRevert = () => {
    setIsCropped(false);
  };

  const handleSwitchFreelancer = () => {
    setCookie("activeagency", false);
    dispatch(clearPagesState());
    dispatch(clearMessageState());
    dispatch(clearNotificationState());
    router.push(`/profile/f/${user_id}`);
  };

  return (
    <>
      <VStack width={"100%"} position={"relative"}>
        <VStack width={"100%"} position={"relative"}>
          {agency_coverImage ? (
            <Image
              src={agency_coverImage}
              alt="cover image"
              className="shadow"
              height={{ base: "150px", md: "250px", lg: "350px" }}
              width={"100%"}
              objectFit={"cover"}
              filter={"brightness(80%)"}
              borderRadius={"20px"}
            />
          ) : (
            <Image
              src="/images/zeework_agency_cover.png"
              alt="cover image"
              className="shadow"
              height={{ base: "150px", md: "250px", lg: "350px" }}
              width={"100%"}
              objectFit={"cover"}
              filter={"brightness(80%)"}
              borderRadius={"10px"}
            />
          )}
          <HStack
            fontSize={"2.5rem"}
            position={"absolute"}
            transform={"translate(-50%, -50%)"}
            top={"50%"}
            left={"50%"}
          >
            <VStack
              backgroundColor={"white"}
              borderRadius={"50%"}
              width={"50px"}
              height={"50px"}
              alignItems={"center"}
              justifyContent={"center"}
              transition={"0.6s ease-in-out"}
              cursor={"pointer"}
              _hover={{
                border: "2px solid var(--primarycolor)",
                backgroundColor: "transparent",
                color: "var(--primarycolor)",
              }}
              onClick={() => handleUpdate("Cover Photo")}
            >
              <RiEdit2Fill fontSize={"25px"} />
            </VStack>
            <VStack
              backgroundColor={"white"}
              borderRadius={"50%"}
              width={"50px"}
              height={"50px"}
              alignItems={"center"}
              justifyContent={"center"}
              transition={"0.6s ease-in-out"}
              cursor={"pointer"}
              _hover={{
                border: "2px solid var(--primarycolor)",
                backgroundColor: "transparent",
                color: "var(--primarycolor)",
              }}
            >
              <RiDeleteBin2Fill cursor={"pointer"} fontSize={"25px"} />
            </VStack>
          </HStack>
        </VStack>

        <AgencyBodyLayout>
          <HStack
            display={{ base: "grid", md: "flex" }}
            justifyContent={"space-between"}
            width={"100%"}
            padding={{ base: "0px", lg: "10px" }}
          >
            <HStack width={"100%"}>
              <HStack position={"relative"}>
                <Avatar
                  src={agency_profileImage}
                  name={agency_name}
                  width={{ base: "70px", md: "80px", lg: "100px" }}
                  height={{ base: "70px", md: "80px", lg: "100px" }}
                  borderRadius={"10px"}
                />

                <VStack
                  backgroundColor={"white"}
                  position={"absolute"}
                  bottom={"0px"}
                  right={"0px"}
                  borderRadius={"50%"}
                  width={"30px"}
                  border={"1px solid var(--primarycolor)"}
                  height={"30px"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  transition={"0.6s ease-in-out"}
                  cursor={"pointer"}
                  _hover={{
                    border: "2px solid var(--primarycolor)",
                    backgroundColor: "transparent",
                    color: "var(--primarycolor)",
                  }}
                  onClick={() => handleUpdate("Profile Photo")}
                >
                  <RiEdit2Fill fontSize={"15px"} />
                </VStack>
              </HStack>

              <VStack
                alignItems={"flex-start"}
                lineHeight={"1.3rem"}
                marginLeft={"1.1rem"}
              >
                <HStack>
                  <Text
                    fontSize={{ base: "1.5rem", md: "1.7rem", lg: "2rem" }}
                    fontWeight={"600"}
                  >
                    {agency_name}
                  </Text>
                  <VStack
                    backgroundColor={"white"}
                    borderRadius={"50%"}
                    width={"30px"}
                    border={"1px solid var(--primarycolor)"}
                    height={"30px"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    transition={"0.6s ease-in-out"}
                    cursor={"pointer"}
                    _hover={{
                      border: "2px solid var(--primarycolor)",
                      backgroundColor: "transparent",
                      color: "var(--primarycolor)",
                    }}
                    onClick={() => handleUpdate("Agency Name", agency_name)}
                  >
                    <RiEdit2Fill fontSize={"15px"} />
                  </VStack>
                </HStack>

                <HStack>
                  <Text fontSize={{ base: "1rem", md: "1.1rem" }}>
                    {agency_tagline}
                  </Text>
                  <VStack
                    backgroundColor={"white"}
                    borderRadius={"50%"}
                    width={"30px"}
                    border={"1px solid var(--primarycolor)"}
                    height={"30px"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    transition={"0.6s ease-in-out"}
                    cursor={"pointer"}
                    _hover={{
                      border: "2px solid var(--primarycolor)",
                      backgroundColor: "transparent",
                      color: "var(--primarycolor)",
                    }}
                    onClick={() =>
                      handleUpdate("Agency Tagline", agency_tagline)
                    }
                  >
                    <RiEdit2Fill fontSize={"15px"} />
                  </VStack>
                </HStack>
              </VStack>
            </HStack>

            <Button
              onClick={handleSwitchFreelancer}
              backgroundColor={"var(--primarycolor)"}
              width={{ base: "100%", md: "70%" }}
              border={"2px solid white"}
              color={"white"}
              borderRadius={"10px"}
              marginTop={{ base: "4px", md: "0px" }}
              padding={"25px 0"}
              transition={"0.6s ease-in-out"}
              fontSize={"1.2rem"}
              _hover={{
                background: "transparent",
                border: "2px solid var(--primarycolor)",
                color: "black",
              }}
            >
              Switch To Your Freelancer Profile
            </Button>
          </HStack>
        </AgencyBodyLayout>
      </VStack>

      {/* Profile Updating Thing */}
      {isModal && (
        <UniversalModal
          isModal={isModal}
          setIsModal={setIsModal}
          title={`Update ${modalType}`}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* update profile photo */}
            {(modalType === "Profile Photo" || modalType === "Cover Photo") && (
              <>
                <div className="flex flex-col gap-[16px]">
                  <div className="flex flex-col">
                    <div className="flex flex-col gap-[2px]">
                      {!imageSrc && (
                        <div
                          {...getRootProps()}
                          className={`w-[100%] ${
                            fileName ? "py-5" : "py-8"
                          } px-3 outline-none border-2 rounded-md border-dashed border-primary cursor-pointer bg-green-100 font-medium tracking-wide`}
                        >
                          {!fileName && (
                            <RiUploadCloud2Fill className="text-green-300 text-6xl mx-auto" />
                          )}
                          <input
                            {...getInputProps()}
                            className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)]"
                            placeholder="Select an image"
                            onChange={() => {
                              const file = getInputProps().files[0];
                              if (file) {
                                setFileName(file.name);
                              }
                              setErrorMessage("");
                            }}
                          />

                          {isDragActive ? (
                            <p className="text-center ">
                              Drop the files here ...{" "}
                            </p>
                          ) : (
                            <p className="text-center ">
                              Drag &apos;n&apos; drop image file here, or click
                              to select file
                            </p>
                          )}
                        </div>
                      )}
                      {fileName && (
                        <p className="text-center mt-2 -mb-4 text-green-600">
                          {fileName}
                        </p>
                      )}
                      {errorMessage && (
                        <p className="text-sm text-red-500">{errorMessage}</p>
                      )}
                    </div>
                  </div>
                  {imageSrc && (
                    <>
                      <div className="relative w-full h-64">
                        <Cropper
                          image={imageSrc}
                          crop={crop}
                          zoom={zoom}
                          aspect={modalType === "Profile Photo" ? 1 : 3 / 1}
                          showGrid={false}
                          onCropChange={isCropped ? undefined : setCrop}
                          onZoomChange={isCropped ? undefined : setZoom}
                          onCropComplete={onCropComplete}
                          cropShape={modalType === "Profile Photo" && "round"}
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center gap-1 w-full sm:w-96">
                          <TiMinus />
                          <Slider
                            aria-label="zoom-slider"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            onChange={(val) => {
                              !isCropped && setZoom(val);
                            }}
                          >
                            <SliderTrack className="bg-slate-300">
                              <SliderFilledTrack bg={"slategrey"} />
                            </SliderTrack>
                            <SliderThumb boxSize={6}>
                              <Box className="text-slate-500" as={TiZoom} />
                            </SliderThumb>
                          </Slider>
                          <TiPlus />
                        </div>
                        <div className="flex items-center justify-center gap-x-5 flex-wrap">
                          <button
                            type="button"
                            disabled={isCropped}
                            className={`flex items-center gap-1 ${
                              isCropped
                                ? "cursor-no-drop bg-slate-400"
                                : "bg-slate-500"
                            } rounded py-1 px-3 text-white w-fit mt-2`}
                            onClick={() => {
                              document.getElementById("file-input").click();
                            }}
                          >
                            <BiImages /> Changed File
                          </button>
                          <input
                            id="file-input"
                            type="file"
                            {...getInputProps()}
                            style={{ display: "none" }}
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                setFileName(file.name);
                                setFullImage([file]);
                                setErrorMessage("");
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => {
                                  setImageSrc(reader.result);
                                };
                              }
                            }}
                          />
                          <div className="flex items-center justify-center gap-5">
                            <button
                              type="button"
                              className={`flex items-center gap-1 ${
                                isCropped
                                  ? "cursor-no-drop bg-slate-400"
                                  : "bg-slate-500"
                              } rounded py-1 px-3 text-white w-fit mt-2`}
                              onClick={handleCrop}
                              disabled={isCropped}
                            >
                              {isCropped ? (
                                <>
                                  <IoMdCheckmarkCircleOutline /> Cropped
                                </>
                              ) : (
                                <>
                                  <BiSolidCrop /> Crop photo
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              className={`flex items-center gap-1 ${
                                !isCropped
                                  ? "cursor-no-drop bg-slate-400"
                                  : "bg-slate-500"
                              } rounded py-1 px-3 text-white w-fit mt-2`}
                              onClick={handleRevert}
                              disabled={!isCropped}
                            >
                              <TiArrowBack /> Revert
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {imageSrc && (
                  <div className="text-right mt-10">
                    <Button
                      isLoading={isLoading}
                      loadingText="Uploading"
                      colorScheme="primary"
                      onClick={() => onSubmit()}
                      paddingX={7}
                      spinner={<BtnSpinner />}
                    >
                      Upload
                    </Button>
                  </div>
                )}
              </>
            )}
            {/* update agency name */}
            {modalType === "Agency Name" && (
              <input
                type="text"
                {...register("agency_name")}
                required
                defaultValue={modalData}
                className="px-3 py-1 border rounded w-full"
              />
            )}
            {/* update agency tagline */}
            {modalType === "Agency Tagline" && (
              <input
                type="text"
                {...register("agency_tagline")}
                required
                defaultValue={modalData}
                className="px-3 py-1 border rounded w-full"
              />
            )}

            {modalType !== "Profile Photo" && modalType !== "Cover Photo" && (
              <div className="text-right mt-10">
                <Button
                  isLoading={isLoading}
                  loadingText="Submit"
                  colorScheme="primary"
                  type="submit"
                  spinner={<BtnSpinner />}
                >
                  Submit
                </Button>
              </div>
            )}
          </form>
        </UniversalModal>
      )}
    </>
  );
};

export default AgencyProfileHeader;

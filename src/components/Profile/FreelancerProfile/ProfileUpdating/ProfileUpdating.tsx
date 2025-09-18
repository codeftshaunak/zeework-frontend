import UniversalModal from "../../../Modals/UniversalModal";
import BasicInfo from "./BasicInfo";
import Education from "./Education";
import Experience from "./Experience";
import Photos from "./Photos";
import PortfolioProject from "./PortfolioProject";
import Skills from "./Skills";

const ProfileUpdating = ({
  type,
  defaultValue,
  isModal,
  setIsModal,
  setDefaultValue,
}) => {
  return (
    <UniversalModal isModal={isModal} setIsModal={setIsModal} title={type}>
      {/* Manage Education */}
      {(type === "Add Education" ||
        type === "Update Education" ||
        type === "Delete Education") && (
        <Education
          type={type}
          defaultValue={defaultValue}
          setIsModal={setIsModal}
          setDefaultValue={setDefaultValue}
        />
      )}

      {/* Manage Experience */}
      {(type === "Add Experience" ||
        type === "Update Experience" ||
        type === "Delete Experience") && (
        <Experience
          type={type}
          defaultValue={defaultValue}
          setIsModal={setIsModal}
          setDefaultValue={setDefaultValue}
        />
      )}

      {/* Manage Portfolio Project */}
      {type === "Add New Project" && (
        <PortfolioProject type={type} setIsModal={setIsModal} />
      )}

      {/* Manage Profile Skills */}
      {type === "Update Skills" && <Skills setIsModal={setIsModal} />}

      {/* Manage Basic Info */}
      {type === "Update Basic Info" && <BasicInfo setIsModal={setIsModal} />}

      {/* Manage Profile Photo */}
      {type === "Update Profile Photo" && <Photos setIsModal={setIsModal} />}
    </UniversalModal>
  );
};

export default ProfileUpdating;

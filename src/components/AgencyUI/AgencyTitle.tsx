import React, { useState } from "react";
import { Text, HStack, VStack } from "@chakra-ui/react";
import { RiEdit2Fill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
// import { AgencyUpdatedModal } from "./ProfileUpdated";

const AgencyTitle = ({
  children,
  isValue,
  data,
  setAgency,
  noAdded,
  isSmall,
}) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <HStack marginBottom={"0.5rem"} marginTop={"1rem"}>
        <Text
          fontSize={
            !isSmall ? { base: "1.3rem", md: "1.7rem", lg: "2rem" } : "1.3rem"
          }
          fontWeight={"600"}
          marginBottom={"0"}
        >
          {children}
        </Text>
        {isValue && (
          <VStack
            backgroundColor={"white"}
            borderRadius={"50%"}
            width={"20px"}
            border={"1px solid var(--primarycolor)"}
            height={"20px"}
            alignItems={"center"}
            justifyContent={"center"}
            transition={"0.6s ease-in-out"}
            cursor={"pointer"}
            _hover={{
              border: "2px solid var(--primarycolor)",
              backgroundColor: "transparent",
              color: "var(--primarycolor)",
            }}
            onClick={() => setIsModal(true)}
          >
            <RiEdit2Fill fontSize={"10px"} />
          </VStack>
        )}
        {noAdded ||
          (!isValue && (
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
              onClick={() => setIsModal(true)}
            >
              <FiPlus fontSize={"25px"} />
            </VStack>
          ))}
      </HStack>
      {/* {isModal && (
        <AgencyUpdatedModal
          isModal={isModal}
          setIsModal={setIsModal}
          title={children}
          data={data}
          setAgency={setAgency}
        />
      )} */}
    </>
  );
};

export default AgencyTitle;

import React from 'react';
import { HStack, Text, VStack } from '@/components/ui/migration-helpers';
import { AiOutlineStar } from "react-icons/ai";
import { BsBriefcase, BsSend } from "react-icons/bs";

const UserCard: React.FC = () => {
  return (
    <VStack color="var(--primarytext)" gap={"5"}>
      <img
        src="./images/user.jpeg"
        alt="user"
        className="w-20 h-20 rounded-full object-cover"
      />

      <VStack gap={"0"}>
        <Text fontSize="1.5rem" fontWeight="500" marginBottom={"0"}>
          Sasheen M.
        </Text>
        <Text marginBottom={"0"}>Customer Experience Consultant</Text>
      </VStack>

      <HStack>
        <HStack>
          <AiOutlineStar />
          <Text>5.0</Text>
        </HStack>
        <HStack>
          <BsSend />
          <Text>$65.00/hr</Text>
        </HStack>
        <HStack>
          <BsBriefcase />
          <Text>$65.00/hr</Text>
        </HStack>
      </HStack>
      <Text textAlign={"center"} fontWeight={"500"} fontSize={"1.1rem"}>
        “ZeeWork has enabled me to increase my rates. I know what I’m bringing to
        the table and love the feelings of being able to help a <br />
        variety of clients.”
      </Text>
    </VStack>
  );
};

export default UserCard;

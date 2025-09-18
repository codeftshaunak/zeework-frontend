import {
  Button,
  Image,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllJobsProposal } from "../../helpers/APIs/jobApis";

const ConnectionHistory = () => {
  const [jobProposal, setJobProposal] = useState(null);
  const tableDummyData = [
    {
      date: "Today",
      title: "UX/UI designer marketing expert brand identity home page design",
      job_title: "Applied for Job",
      contact: "-16",
    },
    {
      date: "Sep 21, 2023",
      title: "UX/UI designer marketing expert brand identity home page design",
      job_title: "Applied for Job",
      contact: "-16",
    },
    {
      date: "Sep 18, 2023",
      title: "UX/UI designer marketing expert brand identity home page design",
      job_title: "Applied for Job",
      contact: "-16",
    },
    {
      date: "Aug 05, 2023",
      title: "UX/UI designer marketing expert brand identity home page design",
      job_title: "Applied for Job",
      contact: "-16",
    },
    {
      date: "Dec 12, 2023",
      title: "UX/UI designer marketing expert brand identity home page design",
      job_title: "Applied for Job",
      contact: "-16",
    },
  ];

  const getAllJobProposalList = async () => {
    try {
      const response = await getAllJobsProposal();
      setJobProposal(response);
    } catch (error) {
      console.error("Error fetching job list:", error);
    }
  };

  useEffect(() => {
    getAllJobProposalList();
  }, []);

  return (
    <div className="my-3 space-y-4">
      <h2 className="my-3 text-2xl font-medium text-[#374151]">
        Connect History
      </h2>

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-12 md:col-span-8">
          <div className="flex justify-between p-6 bg-[#DFDFDF] rounded-lg">
            <div className="space-y-6">
              <h2 className="text-xl font-medium text-[#374151]">My Balance</h2>
              <h2 className="text-2xl font-medium text-[#374151]">
                106 Connects
              </h2>
              <Button
                colorScheme="22C35E"
                bg={"#22C35E"}
                color={"#fff"}
                size="sm"
              >
                Buy Connects
              </Button>
            </div>
            <div className="mt-auto">
              <div className="w-[120px] h-[110px]">
                <Image
                  src="./images/report_card.png"
                  alt="user"
                  width="100%"
                  height={"100%"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 my-auto">
          <div className="space-y-3">
            <div className="">
              <label className="text-sm font-medium"> Statement Period </label>
              <Select
                placeholder="Select option"
                size={"sm"}
                borderRadius={"lg"}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </div>
            <div className="">
              <label className="text-sm font-medium">Day Period</label>
              <Select
                placeholder="Select option"
                className="mb-2"
                size={"sm"}
                borderRadius={"lg"}
              >
                <option value="option1">Last 7 Days</option>
                <option value="option2">Last 20</option>
                <option value="option3">Last 30 Days</option>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="my-5">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th className="capitalize" >Date</Th>
                <Th className="capitalize" >Action</Th>
                <Th className="capitalize" >Contacts</Th>
              </Tr>
            </Thead>
            <Tbody>
              {jobProposal?.map((item, index) => {
                const { createdAt, jobId } = item;
                const dateObject = new Date(createdAt);

                const formattedDate = dateObject.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                });


                return (
                  <Tr key={index}>
                    <Td className="text-2xl font-normal text-[#6B7280]">{formattedDate}</Td>
                    <Td>
                      <div className="text-[#6B7280]">{item.job_title}</div>
                      <div className="text-[#22C35E] text-lg font-medium">{jobId?.title}</div>
                    </Td>
                    <Td className="text-[#6B7280] font-normal text-lg">{-16}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </div> */}
    </div>
  );
};

export default ConnectionHistory;

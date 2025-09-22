
"use client";
import React from "react";


import {
  getClientContract,
  getClientReport,
} from "../../helpers/APIs/clientApis";
import { useEffect, useState } from "react";
import ActiveContract from "./ActiveContract";
import CompletedJobs from "./CompletedJobs";
import { useDispatch, useSelector } from "react-redux";
import { setStatsData } from "../../redux/pagesSlice/pagesSlice";

const ClientReport = () => {
  const [isReportsLoading, setIsReportsLoading] = useState(false);
  const [isContractLoading, setIsContractLoading] = useState(false);

  const { reports, activeContracts } = useSelector(
    (state) => state.pages.myStats
  );
  const dispatch = useDispatch();

  const getClientReports = async () => {
    if (!reports || Object.keys(reports).length === 0) {
      setIsReportsLoading(true);
      try {
        const { code: reportCode, body: reportBody } = await getClientReport();

        if (reportCode === 200) dispatch(setStatsData({ reports: reportBody }));
      } catch (error) {
        console.error("Error fetching client report:", error);
      } finally {
        setIsReportsLoading(false);
      }
    }
  };

  const getActiveContract = async () => {
    if (!activeContracts?.length) {
      setIsContractLoading(true);
      try {
        const { code: contractCode, body: contractBody } =
          await getClientContract();

        if (contractCode === 200)
          dispatch(setStatsData({ activeContracts: contractBody }));
      } catch (error) {
        console.error("Error fetching client contracts:", error);
      } finally {
        setIsContractLoading(false);
      }
    }
  };

  useEffect(() => {
    getClientReports();
    getActiveContract();
  }, []);

  const renderSkeleton = (isLoading, children) => (
    <Skeleton isLoaded={!isLoading} startColor="gray.100" endColor="gray.200">
      {children}
    </Skeleton>
  );

  return (
    <div className="w-full">
      <div>
        <h2 className="mt-8 mb-8 text-[25px] font-semibold">Overview</h2>

        <div className="flex flex-row items-center max-md:!flex-col flex-wrap"
         
        >
          {renderSkeleton(
            isReportsLoading,
            <OverviewCard
              value={`$${reports.current_week?.toFixed(2) || 0}`}
              label="Current Week Spend"
            />
          )}
          {renderSkeleton(
            isReportsLoading,
            <OverviewCard
              value={reports.total_job_posted || 0}
              label="Posted Jobs"
            />
          )}
          {renderSkeleton(
            isReportsLoading,
            <OverviewCard
              value={reports.total_hired || 0}
              label="Total Hires"
            />
          )}
          {renderSkeleton(
            isReportsLoading,
            <OverviewCard
              value={`$${reports.total_spend?.toFixed(2) || 0}`}
              label="Total Spend"
            />
          )}
        </div>
      </div>

      <br />

      <div>
        <h2 className="mt-8 mb-8 text-[25px] font-semibold">
          Active Contracts
        </h2>
        <ActiveContract
          contractList={activeContracts}
          loading={isContractLoading}
        />
      </div>

      {/* Completed Jobs */}
      <div>
        <h2 className="mt-8 mb-8 text-[25px] font-semibold">Completed Jobs</h2>
        <CompletedJobs />
      </div>
    </div>
  );
};

export default ClientReport;

"use client";

// import MyReports from './MyReports'
// import ConnectionHistory from './ConnectionHistory';
// import BillingEarning from './BillingEarning';
// import TransactionHistory from './TransactionHistory';

// import Status from './Status.jsx';
import GenaralStats from "./GenaralStats";
import Adjustment from "./Adjustment";
import Timesheet from "./Timesheet";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { agencyReports } from "../../helpers/APIs/agencyApis";
import { freelancerReports } from "../../helpers/APIs/freelancerApis";
import EarningsOverview from "./EarningsOverview/EarningsOverview";
import {
  getAgencyAllJobs,
  getAllTimeSheet,
  getAllTimeSheetAgency,
  userAllJobs,
} from "../../helpers/APIs/jobApis";
import { useDispatch, useSelector } from "react-redux";
import {
  setMyJobsData,
  setStatsData,
} from "../../redux/pagesSlice/pagesSlice";

const Reports = () => {
  const [cookies] = useCookies(["activeagency"]);
  const activeAgency = cookies.activeagency;
  // const [reports, setReports] = useState([]);
  const reports = useSelector((state: unknown) => state.pages.myStats.reports);
  const userJobs = useSelector((state: unknown) => state.pages.myJobs.userJobs);
  const timeSheet = useSelector((stats) => stats.pages.myStats.timeSheet);
  const [isLoading, setIsLoading] = useState(false);
  const [jobIsLoading, setJobIsLoading] = useState(false);
  const [timeSheetLoading, setTimeSheetLoading] = useState(false);
  const { stats, balance } = reports;
  const dispatch = useDispatch();

  const getStatsReports = async () => {
    setIsLoading(true);
    try {
      const { code, body } = activeAgency
        ? await agencyReports()
        : await freelancerReports();
      if (code === 200) dispatch(setStatsData({ reports: body }));
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const getHourlyJobs = async () => {
    setJobIsLoading(true);
    try {
      const response = activeAgency
        ? await getAgencyAllJobs()
        : await userAllJobs();
      if (response) dispatch(setMyJobsData({ userJobs: response }));
    } catch (error) {
      console.error(error);
    }
    setJobIsLoading(false);
  };

  const getTimeSheet = async () => {
    setTimeSheetLoading(true);
    try {
      const { code, body } = await getAllTimeSheet();
      if (code === 200) dispatch(setStatsData({ timeSheet: body }));
    } catch (error) {
      console.error(error);
    }
    setTimeSheetLoading(false);
  };

  const getTimeSheetAgency = async () => {
    setTimeSheetLoading(true);
    try {
      const { code, body } = await getAllTimeSheetAgency();
      if (code === 200) dispatch(setStatsData({ timeSheet: body }));
    } catch (error) {
      console.error(error);
    }
    setTimeSheetLoading(false);
  }

  useEffect(() => {
    if (Object.keys(reports).length === 0) {
      getStatsReports();
    }
    if (Object.keys(userJobs).length === 0) {
      getHourlyJobs();

    }

    if (activeAgency) {
      getTimeSheetAgency()
    }
  }, []);

  return (
    <div className="w-full mx-auto">
      <EarningsOverview balance={balance} isLoading={isLoading} />
      <GenaralStats stats={stats} isLoading={isLoading} />
      <Timesheet activeJobs={timeSheet} isLoading={timeSheetLoading} />
      <Adjustment />
    </div>
  );
};

export default Reports;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  findWork: {
    jobsList: [],
  },
  myJobs: {
    userJobs: {},
  },
  myStats: { reports: {}, timeSheet: [], activeContracts: [], activeJobs: [] },
  dashboard: {
    jobs: [],
    latestOffer: [],
    hiredList: [],
    purchasedGigs: [],
  },
};

const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    setFindWorkData: (state, action) => {
      const { jobsList } = action.payload;
      state.findWork.jobsList = jobsList;
    },
    setMyJobsData: (state, action) => {
      const { userJobs } = action.payload;
      state.myJobs.userJobs = userJobs;
    },
    setStatsData: (state, action) => {
      const { reports, timeSheet, activeContracts, activeJobs } =
        action.payload;

      if (reports) state.myStats.reports = reports;
      if (timeSheet) state.myStats.timeSheet = timeSheet;
      if (activeContracts) state.myStats.activeContracts = activeContracts;
      if (activeJobs) state.myStats.activeJobs = activeJobs;
    },
    setDashboard: (state, action) => {
      const { jobs, latestOffer, hiredList, purchasedGigs } = action.payload;
      if (jobs) state.dashboard.jobs = jobs;
      if (latestOffer) state.dashboard.latestOffer = latestOffer;
      if (hiredList) state.dashboard.hiredList = hiredList;
      if (purchasedGigs) state.dashboard.purchasedGigs = purchasedGigs;
    },

    clearPagesState: (state) => {
      // state.findWork = { jobsList: [] };
      state.myJobs = { userJobs: {} };
      state.myStats = { reports: {}, timeSheet: [] };
      state.dashboard = { jobs: [], latestOffer: [], hiredList: [] };
    },
  },
});

export const {
  setFindWorkData,
  setMyJobsData,
  setStatsData,
  setDashboard,
  clearPagesState,
} = pagesSlice.actions;

export default pagesSlice.reducer;

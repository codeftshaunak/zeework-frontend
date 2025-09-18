"use client";

import React from 'react';
import HomeLayout from "../../Layouts/HomeLayout";
import Workdairy from "../../WorkDairy/Workdairy";
import Report from "../../WorkDairy/Report";

const TimeTracker = () => {
    return (
        <HomeLayout>
            <Workdairy />
            <Report />
        </HomeLayout>
    );
};

export default TimeTracker;

"use client";

import React from 'react'
import HomeLayout from "../../Layouts/HomeLayout";
import Interview from "../../Invitation/Interview";
import Offer from "../../Invitation/Offer";



export const InterviewInvitation = () => {
    return <HomeLayout><Interview /></HomeLayout>
}

export const OfferInvitation = () => {
    return <HomeLayout><Offer /></HomeLayout>
}


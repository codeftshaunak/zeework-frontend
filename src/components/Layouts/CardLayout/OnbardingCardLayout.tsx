"use client";

import React from 'react';

import HomeLayout from '../HomeLayout';

interface OnbardingCardLayoutProps {
    width?: string;
    gap?: string;
    title: string;
    children: React.ReactNode;
}

const OnbardingCardLayout: React.FC<OnbardingCardLayoutProps> = (props) => {
    return (
        <HomeLayout>
            <br />
            <div className="flex flex-col max-[480px]:w-full max-[480px]:px-2 m-auto justify-center items-center border p-6 rounded mt-[5%] bg-white">
                <span className="max-sm:text-center font-medium">{props.title}</span>
                {props.children}
            </div>
        </HomeLayout>
    )
}

export default OnbardingCardLayout;
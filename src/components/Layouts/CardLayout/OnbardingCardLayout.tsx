"use client";

import React from 'react';
import { Text, VStack } from '@/components/ui/migration-helpers';
import HomeLayout from '../HomeLayout';

interface OnbardingCardLayoutProps {
    width?: string;
    gap?: string;
    title: string;
    children: React.ReactNode;
}

const OnbardingCardLayout: React.FC<OnbardingCardLayoutProps> = (props) => {
    return (
        <HomeLayout width={"98%"}>
            <br />
            <VStack className='max-[480px]:!w-[100%] max-[480px]:!px-2' width={props.width ? props.width : "450px"} border={"1px solid var(--bordersecondary)"} padding={"1.5rem 1.4rem"} borderRadius={"10px"} marginTop={"5%"} gap={props.gap && props.gap} margin={"auto"} justifyContent={"center"} alignItems={"center"} backgroundColor={"#ffff"}>
                <Text className='max-sm:text-center' color={"var(--primarytext)"} fontSize={"25px"} fontWeight={"500"}>{props.title}</Text>
                {props.children}
            </VStack>
        </HomeLayout>
    )
}

export default OnbardingCardLayout;
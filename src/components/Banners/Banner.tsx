import React from 'react'
import Image from 'next/image'

const Banner = () => {
    return (
        <div className="mb-4 hidden lg:flex">
            <Image src="/images/freelancer_dashboard/zeework_header_banner.png" alt="zeework" width={1200} height={200} className="w-full h-auto" />
        </div>
    )
}

export default Banner

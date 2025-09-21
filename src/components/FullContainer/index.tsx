import React from 'react';


interface FullContainerProps {
  children: React.ReactNode;
  bg?: string;
  pad?: string;
  borderBottom?: string;
  mg?: string;
}

const FullContainer: React.FC<FullContainerProps> = ({ children, bg, pad, borderBottom, mg }) => {
    return (
        <div borderBottom={borderBottom}>
            <div className="max-w-[100%] md:max-w-[1400px] mx-auto px-4 lg:px-6 xl:px-8">{children}</div>
        </div>
    );
};

export default FullContainer;

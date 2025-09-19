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
            <div className="max-w-[100%] md:max-w-[85%] mx-auto">{children}</div>
        </div>
    );
};

export default FullContainer;

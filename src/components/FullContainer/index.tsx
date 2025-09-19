import React from 'react';
import { Box } from '@/components/ui/migration-helpers';

interface FullContainerProps {
  children: React.ReactNode;
  bg?: string;
  pad?: string;
  borderBottom?: string;
  mg?: string;
}

const FullContainer: React.FC<FullContainerProps> = ({ children, bg, pad, borderBottom, mg }) => {
    return (
        <Box width="100%" bg={bg} p={pad} borderBottom={borderBottom} margin={mg}>
            <div className="max-w-[100%] md:max-w-[85%] mx-auto">{children}</div>
        </Box>
    );
};

export default FullContainer;

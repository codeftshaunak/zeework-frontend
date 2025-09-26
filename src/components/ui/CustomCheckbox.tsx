
"use client";

import React from 'react';

export const CustomCheckbox = ({
    children,
    size = "md",
    colorScheme = "green",
    ...props
}: {
  children: React.ReactNode;
  size?: string;
  colorScheme?: string;
  [key: string]: unknown;
}) => {
    return (
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
                type="checkbox"
                style={{
                    width: size === 'md' ? '16px' : '14px',
                    height: size === 'md' ? '16px' : '14px',
                    accentColor: colorScheme === 'green' ? '#38A169' : '#3182CE'
                }}
                {...props}
            />
            <span style={{ fontSize: '14px' }}>{children}</span>
        </label>
    );
};
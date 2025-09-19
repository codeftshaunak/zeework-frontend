import React from 'react'

interface DividerProps {
    text?: string;
    dwidth?: string;
}

const Divider: React.FC<DividerProps> = (props) => {
    const width = props.dwidth || "100px";

    return (
        <div className="flex items-center justify-between w-full">
            <div
                className="h-px"
                style={{
                    backgroundColor: "var(--bordersecondary)",
                    width: width
                }}
            ></div>
            <span style={{ color: "var(--secondarytext)" }}>{props.text}</span>
            <div
                className="h-px"
                style={{
                    backgroundColor: "var(--bordersecondary)",
                    width: width
                }}
            ></div>
        </div>
    )
}

export default Divider

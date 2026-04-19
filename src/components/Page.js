import React from "react";

const Page = React.forwardRef((props, ref) => {
    return (
        <div className="page" ref={ref}>
            <img src={props.image} alt="page" />
        </div>
    );
});

export default Page;
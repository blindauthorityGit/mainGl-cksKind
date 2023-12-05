import React from "react";

const Error = (props) => {
    return <div className={`${props.klasse} text-primaryColor font-europa`}>{props.children}</div>;
};

export default Error;

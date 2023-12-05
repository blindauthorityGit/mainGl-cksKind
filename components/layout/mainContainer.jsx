const MainContainer = (props) => {
    return <div className={`grid grid-cols-12 m-auto ${props.width}`}>{props.children}</div>;
};

export default MainContainer;

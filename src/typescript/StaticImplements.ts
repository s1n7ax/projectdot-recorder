export default <T>() => {
    return <U extends T>(constructor: U) => {
        return constructor;
    };
};

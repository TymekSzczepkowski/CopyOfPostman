const withClass = (WrappedComponent, className) => {
  return function (props) {
    return (
      <div className={className}>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withClass;

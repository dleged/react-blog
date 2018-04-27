

export default Loading = ({ error }) => {
  if (error) {
    return (<div>Error!</div>);
  } else {
    return (<div>Loading...</div>);
  }
};

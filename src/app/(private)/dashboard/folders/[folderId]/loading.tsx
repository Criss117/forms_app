interface Props {
  params: {
    folder_id: string;
  };
}

const FolderLoading = () => {
  return <div>{JSON.stringify({ msg: "holaa" }, null, 2)}</div>;
};

export default FolderLoading;

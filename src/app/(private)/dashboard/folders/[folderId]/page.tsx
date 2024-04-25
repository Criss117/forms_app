import { getServerSession } from "next-auth";

import { findFolderHandler } from "@/actions/folder";
import authConfig from "@/lib/auth/auth.config";

import { FolderBody, FolderHeader, Members } from "./_components";

interface Props {
  params: {
    folderId: string;
  };
}

const FolderPage = async ({ params }: Props) => {
  const { folderId } = params;
  const session = await getServerSession(authConfig);

  if (!session) {
    return null;
  }

  const { response } = await findFolderHandler({
    folderId,
    jwtoken: session?.user?.jwt,
  });

  return (
    <>
      <FolderHeader
        folderApi={response?.data}
        statusCode={response?.statusCode}
      />
      <Members />
      <FolderBody folder={response?.data} />
    </>
  );
};

export default FolderPage;

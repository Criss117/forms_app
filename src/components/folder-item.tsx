import { Folder } from "lucide-react";

interface Props {
  folderName: string;
}

const FolderItem = ({ folderName }: Props) => {
  return (
    <div className="flex items-center gap-2 p-1 rounded-sm hover:bg-lightbg-300/50">
      <Folder />
      <p>{folderName}</p>
    </div>
  );
};

export default FolderItem;

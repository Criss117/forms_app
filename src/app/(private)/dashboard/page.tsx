import { findAllFolders } from "@/actions/folder";

const DashboardHomePage = async () => {
  const { response } = await findAllFolders();
  return (
    <div>
      <p>DashboardHomePage</p>
    </div>
  );
};

export default DashboardHomePage;

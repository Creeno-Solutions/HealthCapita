import { useSelector } from "react-redux";

const UserInfo = () => {
  const userId = useSelector((state) => state.user?.user?.userId);
  return userId ?? 10; // If userId is undefined, return null
};

export default UserInfo;

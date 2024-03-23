import { useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import axios from "axios";
const useMyPoint = () => {
  const { currentUser, clearUser } = useCurrentUser();
  const [myPoint, setMyPoint] = useState<number>(0);

  useEffect(() => {
    if (currentUser) {
      getPoint();
    }
  }, [currentUser]);

  const getPoint = async () => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/customers/profile?username=${currentUser?.username}`
    );
    setMyPoint(data?.data?.user?.point);
    return data?.data?.user?.point;
  };
  return { myPoint, setMyPoint, getPoint };
};

export default useMyPoint;

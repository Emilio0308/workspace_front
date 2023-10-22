"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect } from "react"

const Dashboard = () => {
  const router = useRouter();

  const { token } = useSelector((store) => store.user.value);
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, []);

  return <section className="grid grid-cols-[auto,_1fr]"></section>;
};
export default Dashboard;

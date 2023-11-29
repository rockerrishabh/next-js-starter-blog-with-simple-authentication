"use client";

import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

type Props = {
  children: React.ReactNode;
};

function DashboardPage({ children }: Props) {
  const { auth } = useContext(AuthContext);
  return (
    <>
      {children}
      <p>{auth?.user?.email}</p>
    </>
  );
}

export default DashboardPage;

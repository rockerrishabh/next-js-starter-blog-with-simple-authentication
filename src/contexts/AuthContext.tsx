"use client";

import { useAuth } from "@/hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useLayoutEffect, useState } from "react";

export type UserProps = {
  id: string;
  name: string;
  email: string;
  profileImage: string | null;
  role: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  iat: number;
  exp: number;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProps = {
  user: UserProps | null;
  token: string | null;
};

type AuthContextProps = {
  auth: AuthProps | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthProps | null>>;
};

const initialValues = {
  auth: {
    user: null,
    token: null,
  },
  setAuth: () => {},
};

export const AuthContext = createContext<AuthContextProps>({
  ...initialValues,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthProps | null>(null);
  const { me } = useAuth();
  const navigate = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  useLayoutEffect(() => {
    if (!auth) {
      me()
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          const jwtToken: { accessToken: string } = data;
          const decodedToken = jwtDecode(jwtToken.accessToken) as UserProps;
          setAuth({ token: jwtToken.accessToken, user: decodedToken });
          if (pathname !== "/dashboard") {
            navigate.push(pathname);
          } else {
            navigate.push(pathname);
          }
        });
    }
  }, [auth, me]);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

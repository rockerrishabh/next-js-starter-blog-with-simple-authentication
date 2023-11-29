"use client";

import { useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext, UserProps } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      const res = await login({ email, password });
      const data = await res.json();
      if (!res.ok) {
        const msg: { message: string } = data;
        setMessage(msg.message);
      }
      const jwtToken: { accessToken: string } = data;
      const decodedToken = jwtDecode(jwtToken.accessToken) as UserProps;
      setAuth({ token: jwtToken.accessToken, user: decodedToken });
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex rounded-sm py-5 flex-col mt-20 space-y-2 items-center">
      <h1 className="text-xl font-bold text-slate-700">Login Form</h1>
      <section className="flex flex-col space-y-1">
        <label
          className="text-slate-600 font-medium hover:text-opacity-90 cursor-pointer"
          htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email Address"
          className="outline-none rounded-sm p-1 shadow-sm ring-1 ring-slate-400 focus:ring-2 focus:ring-cyan-500"
        />
      </section>
      <section className="flex flex-col space-y-1">
        <label
          className="text-slate-600 font-medium hover:text-opacity-90 cursor-pointer"
          htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
          className="outline-none rounded-sm p-1 shadow-sm ring-1 ring-slate-400 focus:ring-2 focus:ring-cyan-500"
        />
      </section>
      <button
        type="submit"
        className="py-2 w-[13.4rem] bg-emerald-500 hover:opacity-90 rounded-md text-white">
        Login
      </button>
      {message && <p>{message}</p>}
      {auth && <p>{auth.user?.name}</p>}
    </form>
  );
}

export default LoginForm;

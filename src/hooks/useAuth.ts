type LoginProps = {
  email: string;
  password: string;
};

type RegisterProps = {
  name: string;
  email: string;
  password: string;
};

export const useAuth = () => {
  const login = async ({ email, password }: LoginProps) => {
    const res = await fetch("/api/user/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    return res;
  };

  const me = async () => {
    const res = await fetch("/api/user/me", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    });
    return res;
  };
  return {
    login,
    me,
  };
};

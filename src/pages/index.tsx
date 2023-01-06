/* eslint-disable no-unused-vars */
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

const Login: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const { updateIsAuthenticated, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("home");
    }
  }, [isAuthenticated, router]);

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    await api
      .post("/user/signin", {
        username,
        password,
      })
      .then((res) => {
        router.push("home");
        setCookie("token", res.data.token, { path: "/" });
        updateIsAuthenticated(true);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="flex h-[100vh] w-[100vw] flex-col items-center bg-zinc-900">
      <ToastContainer
        pauseOnHover={false}
        autoClose={4000}
        style={{ width: 450, cursor: "help" }}
      />
      <div className="mt-24">
        <p className="p-0 text-center text-6xl  tracking-[12px] text-white">
          CHIC
        </p>
        <p className="mt-2 p-0 text-center text-4xl tracking-[8px] text-zinc-200">
          Acessórios
        </p>
      </div>
      <form onSubmit={handleSignIn} className="mt-16 flex flex-col gap-6">
        <input
          className="h-9 min-w-[300px] rounded-sm p-4 px-4 focus:outline-none"
          placeholder="Usuário"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="h-9 min-w-[300px] rounded-sm p-4 px-4 focus:outline-none"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button
          type="submit"
          className="mt-12 w-20 items-center justify-center self-center border-b-[1px] pb-2 text-xl text-white"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;

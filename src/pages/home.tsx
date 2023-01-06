import { type NextPage } from "next";
import { ReactNode, useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListProducts from "../components/content/ListProducts/ListProducts";
import { useAuth } from "../context/AuthContext";

const Home: NextPage = () => {
  const [content, setContent] = useState<ReactNode>(<ListProducts />);
  const { isAuthenticated } = useAuth();
  const changeContent = (newContent: ReactNode) => {
    setContent(newContent);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated]);

  return (
    <div className="relative flex h-[100vh] w-[100vw]">
      <ToastContainer
        pauseOnHover={false}
        autoClose={4000}
        style={{ width: 450, cursor: "help" }}
      />
      <SideBar changeContent={changeContent} />
      {content}
    </div>
  );
};

export default Home;

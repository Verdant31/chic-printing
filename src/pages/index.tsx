import { type NextPage } from "next";
import { ReactNode, useState } from "react";
import SideBar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListProducts from "../components/content/ListProducts/ListProducts";

const Home: NextPage = () => {
  const [content, setContent] = useState<ReactNode>(<ListProducts />);

  const changeContent = (newContent: ReactNode) => {
    setContent(newContent);
  };

  return (
    <div className="flex h-[100vh] w-[100vw]">
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

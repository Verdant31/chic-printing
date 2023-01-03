import { type NextPage } from "next";
import { useState } from "react";
import AddProduct from "../components/content/AddProduct";
import SideBar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";

const Home: NextPage = () => {
  const [content, setContent] = useState(<AddProduct />);

  return (
    <div className="flex h-[100vh] w-[100vw]">
      <ToastContainer />
      <SideBar />
      {content}
    </div>
  );
};

export default Home;

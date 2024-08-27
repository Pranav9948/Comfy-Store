import React from "react";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import { Header, Navbar } from "../components";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

const HomeLayout = () => {

  const {state}= useNavigation()

  const isLoading = state==='loading' ? true : false

  
  
  


  return (
    <div>
      <Header />
      <Navbar />

      {isLoading ? (
        <div className="grid place-content-center place-items-center h-screen bg-black">
          {" "}
          <Loading />{" "}
        </div>
      ) : (
        <div className="min-h-screen">
          <Outlet />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default HomeLayout;

import React from "react";
import { Button } from "@mantine/core";
import Image from "next/image";
import Dropdown from "../Menus/Dropdown";
import NavBarSearch from "../searchbar/NavBarSearch";
import useUser from "../../utilities/functions/user";
import LoggedIn from "./../Menus/LoggedIn";
import "./NavBar.css"; // Make sure to use the correct file path

export default function Navbar() {
  const user = useUser();

  console.log(user);

  return (
    <header className="z-50 grid grid-cols-6 bg-white border-b-0 md:border-b-2 xl:border-b-2 border-gray-200 p-4 px-10">
      <div className=" relative items-center col-span-1 h-10 cursor-pointer my-auto">
        <Image src="/logo.png" width={40} height={40} alt="" />
      </div>

      <div className="col-span-4 md:col-span-3 xl:col-span-3">
        <NavBarSearch />
      </div>
      <div className="flex items-center space-x-4 justify-end text-gray-500 md:flex xl:flex col-span-2">
        <Button size="lg" className="ml-4 bg-blue-500 invisible md:visible">
          Find Vacation Rental
        </Button>
        <div className="">
          {(() => {
            if (user?._id == null) {
              return (
                <div className="flex items-center space-x-2 border-1 p-2 rounded-md transition ease-in-out hover:shadow-md cursor-pointer">
                  <Dropdown />
                </div>
              );
            } else {
              return (
                <div className="flex items-center space-x-2 border-1 p-2 rounded-md transition ease-in-out hover:shadow-md cursor-pointer">
                  <LoggedIn />
                </div>
              );
            }
          })()}
        </div>
      </div>
    </header>
  );
}

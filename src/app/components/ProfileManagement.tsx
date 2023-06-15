import React from "react";
import { BigHead } from "@bigheads/core";
import { useUser } from "@/app/context/userprovider";
import { useRouter } from "next/navigation";
import { MdManageAccounts } from "react-icons/md";

const av = <BigHead />;
const ProfileManagement = ({ isOpen, toggle, name }: any) => {
  const { Logout } = useUser();
  const options = ["Sign Out"];
  const router = useRouter();
  const handleProfileManagement = (operation: string) => {
    switch (operation) {
      case "Sign Out": {
        Logout();
        router.replace("/");
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="w-full h-full relative">
      <button
        onClick={toggle}
        className="text-black ring-1 ring-gray-500 w-full align-middle hover:bg-gray-300 justify-between focus:ring-1 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 text-center inline-flex items-center  dark:hover:bg-gray-200 dark:focus:ring-gray-800"
      >
        <MdManageAccounts size={22} className="mr-2" />

        <p className="w-full py-3 text-sm">{name}</p>
        {/* {av} */}
      </button>
      <div
        className="z-10 mt-1 w-full absolute bg-white divide-y divide-gray-100 rounded-lg shadow px-4 flex dark:bg-secondaryColor"
        style={{ display: isOpen ? "" : "none" }}
      >
        <ul className="py-2 px-4 text-sm cursor-pointer text-secondaryColor dark:text-black">
          {options.map((item: any, index: number) => (
            <li
              key={index}
              onClick={() => {
                handleProfileManagement(item);
              }}
            >
              <div className="flex items-center py-2 text-sm">{item}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileManagement;

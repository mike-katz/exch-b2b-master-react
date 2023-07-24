import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import ChangePasswordModal from "./ChangePasswordModal";

const Profile = () => {
  return (
    <div>
      <ChangePasswordModal isVisible />
      <div className="text-[#243a48] text-[16px] font-black">Profile</div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <div className="bg-[#7e97a7] text-[#ffffff] px-[10px] text-[15px] font-black leading-[24px]">
            About You
          </div>
          <div className="bg-[#FFFFFF] flex w-full">
            <div className="mr-4">
              <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6] whitespace-nowrap">
                First Name
              </div>
              <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6] whitespace-nowrap">
                Last Name
              </div>
              <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6] whitespace-nowrap">
                Birth Date
              </div>
              <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6] whitespace-nowrap">
                E-Mail
              </div>
              <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6] whitespace-nowrap">
                Password
              </div>
              <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6] whitespace-nowrap">
                Time Zone
              </div>
            </div>
            <div className="w-full">
              <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6]">
                -
              </div>
              <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6]">
                -
              </div>
              <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6]">
                -
              </div>
              <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6]">
                skyid0080@gmail.com
              </div>
              <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6] flex items-center justify-between">
                <div>********************************</div>
                <div className="text-[#2789ce] flex items-center">
                  Edit
                  <FaPencilAlt className="ml-1" />
                </div>
              </div>
              <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6]">
                IST
              </div>
            </div>
          </div>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td></td>
          </tr>
        </div>
        <div className="col-span-6">
          <div className="bg-[#7e97a7] text-[#ffffff] px-[10px] text-[15px] font-black leading-[24px]">
            Contact Details
          </div>
          <div className="bg-[#FFFFFF] flex w-full">
            <div className="mr-4">
              <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6] whitespace-nowrap">
                Primary Number
              </div>
            </div>
            <div className="w-full">
              <div className="text-[#243a48] px-[10px] leading-[24px] border-b border-[#e0e6e6]">
                -
              </div>
            </div>
          </div>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td></td>
          </tr>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React from "react";
import UserProfile from "./UserProfile";
import { IoShareOutline } from "react-icons/io5";
import {
  HiOutlineArrowPathRoundedSquare,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineHeart,
} from "react-icons/hi2";
import CrudActivities from "./CrudActivities";

interface CrudProps {
  item: string;
}
const Crud: React.FC<CrudProps> = ({ item }) => {
  const activities = [
    {
      icon: HiOutlineHeart,
      label: "like",
      count: 10,
    },
    {
      icon: HiOutlineChatBubbleOvalLeft,
      label: "comment",
      count: 10,
    },
    {
      icon: HiOutlineArrowPathRoundedSquare,
      label: "reshare",
      count: 10,
    },
    {
      icon: IoShareOutline,
      label: "share",
    },
  ];
  return (
    <div className="flex flex-col gap-y-2 p-6 h-full w-full border-b border-neutral-800">
      <div className="inline-flex justify-between items-center">
        <div>
          <UserProfile ShowName={true} />
        </div>
        <div>
          <p className="text-xs text-neutral-500">{`10d`}</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 ml-12">
        <div>
          <p className="-1  text-sm md:text-base break-words line-clamp-4">
            {item}
          </p>
        </div>
        <div className="flex flex-row w-full sm:w-4/5 justify-between text-neutral-500">
          {activities.map((activity, index) => (
            <CrudActivities key={index} {...activity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Crud;

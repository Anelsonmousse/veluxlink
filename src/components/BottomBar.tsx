import { FaHistory } from "react-icons/fa";
import Button from "./Button";
import { MdHome } from "react-icons/md";
import { IoCalendarClearOutline } from "react-icons/io5";
import Image from "next/image";

type BottomBarProps = {
  actions: Record<string, () => void>;
  profile: string;
};

const BottomBar = ({ actions, profile }: BottomBarProps) => {
  return (
    <footer className="sticky px-2 md:px-6  py-4 bg-black bottom-0 z-50 left-0 mt-4 w-full">
      <div className="flex justify-between mb-4 items-center">
        <div className="flex gap-2">
          <p>Total Revenue:</p>
          <p className="text-main text-sm sm:text-base">12.52 SOL</p>
        </div>
        <Button
          onClick={() =>
            typeof actions?.history === "function" && actions.history()
          }
          className="w-auto p-2 bg-transparent flex items-center gap-2"
        >
          <p>History</p>
          <FaHistory size={20} className="fill-main" />
        </Button>
      </div>
      <div className="bg-[#CCDECF40] px-16 py-6 rounded-2xl flex justify-between items-center">
        <MdHome
          onClick={actions.home}
          size={32}
          className="h-6 w-6 cursor-pointer md:w-8 md:h-8"
          color="#fff"
        />
        <Image
          src={profile}
          unoptimized
          onClick={() => actions.profile && actions.profile()}
          alt="user's Image"
          width={32}
          height={32}
          className="rounded-full cursor-pointer"
        />
      </div>
    </footer>
  );
};

export default BottomBar;

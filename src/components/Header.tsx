import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex flex-wrap  px-2 md:px-16  gap-5 justify-between items-center w-full font-semibold max-md:max-w-full">
      <div className="relative shrink-0 self-stretch max-w-full aspect-[5.71] w-[257px]">
        <Image
          src="/logo.png"
          alt="VeluxLink"
          fill
          className="object-contain"
        />
      </div>

      <div className="flex gap-3.5 self-stretch my-auto text-sm text-white">
        <Link
          href="/auth/login"
          className="px-5 py-2.5 rounded-sm whitespace-nowrap bg-neutral-600"
        >
          Sign in
        </Link>
        <Link
          href="/auth/register"
          className="px-5 py-2.5 rounded-sm whitespace-nowrap bg-[#00B81B]"
        >
          Register
        </Link>
      </div>
    </header>
  );
};

export default Header;

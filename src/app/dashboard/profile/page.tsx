import React from "react";

interface ProfileImageProps {
  src: string;

  alt: string;
}

interface SocialIconProps {
  src: string;

  alt: string;
}

const EditButton: React.FC = () => (
  <button className="px-7 py-2 text-sm font-bold text-white whitespace-nowrap bg-green-900 rounded-md max-md:px-5">
    EDIT
  </button>
);

const SocialIcon: React.FC<SocialIconProps> = ({ src, alt }) => (
  <img
    loading="lazy"
    src={src}
    alt={alt}
    className="object-contain shrink-0 w-7 aspect-square"
  />
);

const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt }) => (
  <img
    loading="lazy"
    src={src}
    alt={alt}
    className="object-contain grow w-full aspect-[0.85] max-md:mt-7 max-md:max-w-full"
  />
);

export default function () {
  return (
    <div className="flex overflow-hidden flex-col px-11 py-16 bg-neutral-900 max-md:px-5">
      <div className="max-w-full w-[837px]">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[57%] max-md:ml-0 max-md:w-full">
            <ProfileImage
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2e3eb468a687339732068337d8ca5da493694b9333e94fb0adb0e121b09a5b90?placeholderIfAbsent=true&apiKey=e00d6ddf1d4c4f1ab2742b8880176f12"
              alt="Profile"
            />
          </div>
          <div className="flex flex-col ml-5 w-[43%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col w-full mt-[461px] max-md:mt-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1b80f598e0bef87a37f8643a475d6ff3c31ab9637b84e0fcdf40d0f91a0cb581?placeholderIfAbsent=true&apiKey=e00d6ddf1d4c4f1ab2742b8880176f12"
                alt="Logo"
                className="object-contain aspect-[18.18] w-[345px]"
              />

              <div className="self-start mt-2.5 text-sm text-white">
                christopherakpan45@gmail.com
              </div>

              <div className="flex gap-5 justify-between mt-4 w-full">
                <div className="flex gap-6 self-start">
                  <SocialIcon
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/aab70609b90d1246ae7bce29384f64893717f6bce8a958552911372beac784f7?placeholderIfAbsent=true&apiKey=e00d6ddf1d4c4f1ab2742b8880176f12"
                    alt="Social Icon 1"
                  />

                  <div>
                    <SocialIcon
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/b890ec515f1c310a471200821edeed390b1be0d2c5da357507aa163595561688?placeholderIfAbsent=true&apiKey=e00d6ddf1d4c4f1ab2742b8880176f12"
                      alt="Social Icon 2"
                    />
                  </div>

                  <SocialIcon
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/80cfd63e718b2b7411a9c087e84ecd616a023f6dfc2a67406c669bafdf93d064?placeholderIfAbsent=true&apiKey=e00d6ddf1d4c4f1ab2742b8880176f12"
                    alt="Social Icon 3"
                  />
                </div>

                <EditButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex flex-wrap gap-5 justify-between items-center px-20 py-6 mt-16 rounded-3xl bg-neutral-300 bg-opacity-30 max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/92f30c2352ebf418db456ce21d0c47444c5ba694cdf6e0ced7790b382a1bbe9a?placeholderIfAbsent=true&apiKey=e00d6ddf1d4c4f1ab2742b8880176f12"
          alt="Navigation Icon 1"
          className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square"
        />

        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0c1271c1e61b418e04dd0b1941279b798182bf4e3d51136233045956c8b870d6?placeholderIfAbsent=true&apiKey=e00d6ddf1d4c4f1ab2742b8880176f12"
          alt="Navigation Icon 2"
          className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square"
        />

        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4ea0970a7563a12eaa26070e485c56d9a6f76d078af77dae69d590ba74be8e0?placeholderIfAbsent=true&apiKey=e00d6ddf1d4c4f1ab2742b8880176f12"
          alt="Navigation Icon 3"
          className="object-contain shrink-0 self-stretch w-11 rounded-full aspect-square"
        />
      </nav>
    </div>
  );
}

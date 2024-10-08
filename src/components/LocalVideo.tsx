import { useState } from "react";

import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers,
  useConnectionState,
} from "agora-rtc-react";
import Loader from "./Loader";

type Props = {
  userId: string;
  receivingId: string;
  channel: string;
  token: string;
};

const LiveVideo = ({ token, channel, receivingId, userId }: Props) => {
  const appId = process.env.NEXT_PUBLIC_APP_ID as string;
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  useJoin(
    {
      appid: appId,
      channel,
      uid: userId,
      token,
    },
    true
  );

  const state = useConnectionState();

  usePublish([localMicrophoneTrack, localCameraTrack]);

  const remoteUsers = useRemoteUsers();

  const { audioTracks } = useRemoteAudioTracks(remoteUsers);
  audioTracks.forEach((track) => track.play());

  if (state === "CONNECTING")
    return (
      <div className="fixed w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="flex h-screen p-4 gap-4 flex-col">
      <div className="flex-1 w-full overflow-hidden rounded-md h-full bg-white">
        {userId === receivingId ? (
          <LocalUser
            audioTrack={localMicrophoneTrack}
            videoTrack={localCameraTrack}
            cameraOn={cameraOn}
            micOn={micOn}
            playAudio={micOn}
            playVideo={cameraOn}
            className="w-60 h-60"
          />
        ) : remoteUsers.findIndex((user) => user.uid === receivingId) !== -1 ? (
          <RemoteUser
            user={remoteUsers.find((user) => user.uid === receivingId)}
          />
        ) : null}
      </div>
      <div className="flex gap-4 w-full overflow-x-auto">
        {userId !== receivingId && (
          <div className="md:w-60  w-40 h-20 md:h-40 shrink-0 overflow-hidden rounded-md bg-white">
            <LocalUser
              audioTrack={localMicrophoneTrack}
              videoTrack={localCameraTrack}
              cameraOn={cameraOn}
              micOn={micOn}
              playAudio={micOn}
              playVideo={cameraOn}
            />
          </div>
        )}
        {remoteUsers
          .filter((user) => user.uid !== receivingId)
          .map((user, index) => (
            <div
              key={index}
              className="md:w-60  w-40 h-20 md:h-40 shrink-0 rounded-md bg-white"
            >
              <RemoteUser user={user} />
            </div>
          ))}
      </div>
      <div className="fixed p-2 z-50 gap-3 right-4 top-1/2 -translate-y-1/2 bg-black rounded-full flex flex-col">
        {micOn ? (
          <svg
            onClick={() => {
              setMic(false);
            }}
            width="64"
            height="64"
            viewBox="0 0 84 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_17_2926)">
              <circle cx="42" cy="42" r="36" fill="#575757" />
            </g>
            <g clipPath="url(#clip0_17_2926)">
              <path
                d="M30.8058 42.0158C31.221 41.957 31.6426 42.0654 31.978 42.3171C32.3135 42.5689 32.5353 42.9434 32.5949 43.3585C32.7931 44.7343 33.2908 46.0498 34.0528 47.2123C34.8149 48.3747 35.8227 49.3558 37.0053 50.0863C38.1878 50.8168 39.5163 51.2789 40.8969 51.44C42.2775 51.6011 43.6767 51.4573 44.9956 51.0187L45.4595 50.8492L47.8488 53.2385C46.6877 53.8424 45.44 54.2628 44.1501 54.4846L43.5833 54.5685V56.25C43.5828 56.6535 43.4283 57.0417 43.1513 57.3352C42.8742 57.6286 42.4956 57.8052 42.0927 57.8288C41.6899 57.8525 41.2932 57.7214 40.9837 57.4624C40.6742 57.2034 40.4754 56.836 40.4277 56.4352L40.4166 56.25V54.5685C37.6647 54.2207 35.1029 52.9799 33.124 51.0362C31.1452 49.0925 29.8586 46.5534 29.4615 43.8082C29.432 43.6023 29.4433 43.3926 29.4948 43.1912C29.5462 42.9897 29.6369 42.8003 29.7616 42.6339C29.8863 42.4674 30.0425 42.3272 30.2214 42.2211C30.4003 42.1151 30.5999 42.0453 30.8058 42.0158ZM41.9999 26.1667C44.04 26.1668 46.0013 26.9544 47.4748 28.3654C48.9482 29.7763 49.8202 31.7016 49.9087 33.7397L49.9166 34.0833V42C49.9171 43.4131 49.5393 44.8006 48.8225 46.0185L48.6056 46.3668L49.744 47.5052C50.6022 46.3019 51.1849 44.8896 51.4034 43.3585C51.463 42.9428 51.6853 42.5678 52.0215 42.316C52.3576 42.0642 52.78 41.9562 53.1957 42.0158C53.6114 42.0755 53.9864 42.2978 54.2382 42.6339C54.49 42.97 54.598 43.3924 54.5384 43.8082C54.2514 45.8151 53.4844 47.7231 52.3027 49.3704L52.0066 49.7662L55.4345 53.1957C55.7185 53.4807 55.8834 53.863 55.8956 54.2651C55.9079 54.6672 55.7667 55.0589 55.5006 55.3606C55.2346 55.6623 54.8637 55.8515 54.4632 55.8896C54.0627 55.9278 53.6628 55.8121 53.3445 55.566L53.1957 55.4346L28.5654 30.8058C28.2814 30.5209 28.1165 30.1386 28.1043 29.7365C28.092 29.3344 28.2332 28.9427 28.4993 28.641C28.7653 28.3392 29.1362 28.1501 29.5367 28.1119C29.9372 28.0738 30.3371 28.1895 30.6554 28.4356L30.8042 28.567L34.335 32.0978C34.775 30.3997 35.7665 28.8958 37.1538 27.8223C38.5412 26.7487 40.2458 26.1664 41.9999 26.1667ZM34.0833 39.473L44.2134 49.6032C43.0335 49.9468 41.7898 50.011 40.5808 49.7907C39.3718 49.5704 38.2306 49.0716 37.2477 48.3339C36.2648 47.5962 35.4672 46.6398 34.9179 45.5404C34.3687 44.4411 34.0829 43.2289 34.0833 42V39.473Z"
                fill="white"
                fillOpacity="0.8"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_17_2926"
                x="0"
                y="0"
                width="84"
                height="84"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feMorphology
                  radius="2"
                  operator="dilate"
                  in="SourceAlpha"
                  result="effect1_dropShadow_17_2926"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.45 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_17_2926"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_17_2926"
                  result="shape"
                />
              </filter>
              <clipPath id="clip0_17_2926">
                <rect
                  width="38"
                  height="38"
                  fill="white"
                  transform="translate(23 23)"
                />
              </clipPath>
            </defs>
          </svg>
        ) : (
          <svg
            width="64"
            height="64"
            onClick={() => setMic(true)}
            viewBox="0 0 84 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_17_2920)">
              <circle cx="42" cy="42" r="36" fill="#575757" />
            </g>
            <g clipPath="url(#clip0_17_2920)">
              <path
                d="M53.1939 42.0158C53.4001 42.0449 53.5985 42.1144 53.7777 42.2203C53.957 42.3262 54.1136 42.4664 54.2386 42.6329C54.3636 42.7994 54.4545 42.9888 54.5062 43.1905C54.5579 43.3922 54.5693 43.6021 54.5398 43.8082C54.1429 46.5537 52.8561 49.0932 50.8769 51.0369C48.8977 52.9807 46.3354 54.2213 43.5831 54.5685V56.25C43.5831 56.6699 43.4163 57.0726 43.1194 57.3696C42.8224 57.6665 42.4197 57.8333 41.9998 57.8333C41.5799 57.8333 41.1771 57.6665 40.8802 57.3696C40.5833 57.0726 40.4164 56.6699 40.4164 56.25V54.5685C37.6646 54.2207 35.1027 52.9799 33.1239 51.0362C31.145 49.0925 29.8584 46.5534 29.4614 43.8082C29.4017 43.3924 29.5097 42.97 29.7615 42.6339C30.0133 42.2978 30.3883 42.0755 30.804 42.0158C31.2198 41.9562 31.6421 42.0642 31.9783 42.316C32.3144 42.5678 32.5367 42.9428 32.5964 43.3585C32.9238 45.6188 34.0545 47.6856 35.7814 49.1803C37.5083 50.6751 39.7158 51.4978 41.9998 51.4978C44.2837 51.4978 46.4913 50.6751 48.2181 49.1803C49.945 47.6856 51.0757 45.6188 51.4032 43.3585C51.4327 43.1526 51.5025 42.9546 51.6085 42.7757C51.7145 42.5968 51.8548 42.4406 52.0212 42.3159C52.1877 42.1912 52.377 42.1005 52.5785 42.049C52.78 41.9976 52.9881 41.9863 53.1939 42.0158ZM41.9998 26.1667C44.0994 26.1667 46.113 27.0007 47.5977 28.4854C49.0824 29.9701 49.9164 31.9837 49.9164 34.0833V42C49.9164 44.0996 49.0824 46.1133 47.5977 47.5979C46.113 49.0826 44.0994 49.9167 41.9998 49.9167C39.9001 49.9167 37.8865 49.0826 36.4018 47.5979C34.9172 46.1133 34.0831 44.0996 34.0831 42V34.0833C34.0831 31.9837 34.9172 29.9701 36.4018 28.4854C37.8865 27.0007 39.9001 26.1667 41.9998 26.1667Z"
                fill="white"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_17_2920"
                x="0"
                y="0"
                width="84"
                height="84"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feMorphology
                  radius="2"
                  operator="dilate"
                  in="SourceAlpha"
                  result="effect1_dropShadow_17_2920"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.45 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_17_2920"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_17_2920"
                  result="shape"
                />
              </filter>
              <clipPath id="clip0_17_2920">
                <rect
                  width="38"
                  height="38"
                  fill="white"
                  transform="translate(23 23)"
                />
              </clipPath>
            </defs>
          </svg>
        )}
        <svg
          width="64"
          height="64"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_17_2942)">
            <circle cx="50" cy="50" r="43" fill="#D92121" />
          </g>
          <path
            d="M71.556 53.1493L71.127 55.3962C70.7262 57.5 68.7611 58.9127 66.5337 58.6982L62.0985 58.2692C60.1659 58.0828 58.5192 56.7092 58.0296 54.8762L56.6602 49.7737C54.6366 48.9431 52.4049 48.5639 49.9652 48.6362C47.6178 48.6865 45.3044 49.2074 43.1619 50.168L42.3147 54.9455C41.994 56.7568 40.499 58.1067 38.6075 58.2973L34.1984 58.7393C31.9992 58.9603 29.891 57.5607 29.2649 55.4677L28.5954 53.2208C27.928 50.9848 28.5239 48.6318 30.1575 47.0437C34.0157 43.2953 40.4492 41.4147 49.4582 41.4017C58.4788 41.3915 65.1124 43.2607 69.359 47.009C71.1444 48.5863 71.9807 50.922 71.5582 53.1493"
            fill="white"
          />
          <defs>
            <filter
              id="filter0_d_17_2942"
              x="0"
              y="0"
              width="100"
              height="100"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="3"
                operator="dilate"
                in="SourceAlpha"
                result="effect1_dropShadow_17_2942"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.45 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_17_2942"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_17_2942"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default LiveVideo;

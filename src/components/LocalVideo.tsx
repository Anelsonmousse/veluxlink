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
  const appId = "994c5ec6485943e59acef3f1f12e7213";
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
    </div>
  );
};

export default LiveVideo;

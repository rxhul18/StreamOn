"use client";

import useUser from "@/app/hooks/useUser";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { v4 as uuid } from "uuid";

const LiveStream = ({ roomid }: { roomid: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { fullName } = useUser();

  const role_str = searchParams.get("role") || "Host";

  const role =
    role_str === "Host"
      ? ZegoUIKitPrebuilt.Host
      : role_str === "Cohost"
      ? ZegoUIKitPrebuilt.Cohost
      : ZegoUIKitPrebuilt.Audience;

  let sharedLinks = [];
  const currentUrl = window.location.host + pathname;

  if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
    sharedLinks.push({
      name: "Join as co-host",
      url: `${currentUrl}?role=Cohost`,
    });
  }

  // For audience role
  sharedLinks.push({
    name: "Join as audience",
    url: `${currentUrl}?role=Audience`,
  });

  const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID!);
  const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!;

  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomid,
    uuid(),
    fullName || "user" + Date.now(),
    720
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let myMeeting: unknown = async (element: any) => {
    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role,
        },
      },
      sharedLinks,
    });
  };

  return <div className="w-full h-screen" ref={myMeeting}></div>;
};

export default LiveStream;
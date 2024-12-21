'use client';

import dynamic from "next/dynamic";

const LiveStream = dynamic(() => import("@/components/LiveStream"),{
  ssr: false
});

export default function RoomComponent({roomid}: {roomid: string}) {

  return (
    <LiveStream roomid={roomid}/>
  )
}

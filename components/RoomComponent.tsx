'use client';

import useUser from '@/app/hooks/useUser';

import dynamic from "next/dynamic";
import { useSearchParams } from 'next/navigation';

const LiveStream = dynamic(() => import("@/components/LiveStream"),{
  ssr: false
});

export default function RoomComponent({roomid}: {roomid: string}) {

  return (
    <LiveStream roomid={roomid}/>
  )
}

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useUser from "./hooks/useUser";
import { v4 as uuid } from "uuid";

export default function Home() {

  const [roomID, setRoomId] = useState('');
  const router = useRouter();
  const { fullName, setFullName } = useUser();

  useEffect(() => {
    setFullName('');
  }, [])

  return (
    <div className="w-full h-screen">
      <section className="bg-gray-950 text-white bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]">
        <div className="mx-auto max-w-screen-xl h-screen px-4 py-32 flex-col gap-24 flex items-center">
          <Image src="/logo.svg" width={200} height={200} alt="logo" />
          <div>
            <h1 className="bg-gradient-to-r h-[120px] md:h-[70px] from-green-300 via-blue-500 to-purple-600 bg-clip-text  font-extrabold text-transparent text-5xl">
              {`Have a smooth live streaming`}
            </h1>
            <p className="mx-auto mt-6 max-w-xl sm:text-xl/relaxed">
              Kickstarting the stream with Lodo builed on Next.js and powered by ZegoCloud! 🚀.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <input
                type="text"
                id="name"
                onChange={(e) => setFullName(e.target.value)}
                className="border rounded-md focus:border-transparent focus:outline-none focus:ring-0 px-4 py-2 w-full text-black"
                placeholder="Enter your name"
              />
            </div>
            {fullName && fullName.length >= 3 && (
              <>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <input
                    type="text"
                    id="roomid"
                    value={roomID}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="border rounded-md focus:border-transparent focus:outline-none focus:ring-0 px-4 py-2 w-full text-black"
                    placeholder="Enter room ID to join a live stream"
                  />
                  <button
                    className="rounded-md bg-blue-600 px-10 py-[11px] text-sm font-medium text-white focus:outline-none sm:w-auto"
                    onClick={() => router.push(`/room/${roomID}?role=Audience`)}
                    disabled={!roomID}
                  >
                    Join
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <button
                    className="text-lg font-medium hover:text-blue-400 hover:underline"
                    onClick={() => router.push(`/room/${uuid()}`)}
                  >
                    Or start a new live stream
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

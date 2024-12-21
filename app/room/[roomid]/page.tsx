import RoomComponent from "@/components/RoomComponent";


const Room = async ({params}:{ params: Promise<{roomid: string}>}) => {
  const roomid = (await params).roomid ;
  return(
    <div className="bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:27px_27px]">
      <RoomComponent roomid={roomid}/>
    </div>
  )
}

export default Room
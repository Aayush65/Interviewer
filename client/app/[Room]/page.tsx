'use client'

import { useContext, useEffect, useState } from "react"
import { videoContext } from "../context/videoContext";
import { socket } from "../socket";
import { useRouter } from "next/navigation";

export default function Room({ params }: { params: { Room: string } }) {

    const { name, room } = useContext(videoContext);
    const [ isConnected, setIsConnected ] = useState<boolean>(false);
    const roomId = params.Room;
    
    const router = useRouter();

    useEffect(() => {
        if (!name || room !== roomId) {
            router.back();
            return;
        };

        socket.on("join:room", member => {
            console.log(member);
            setIsConnected(member.members === 1);
        });

        return () => {
            socket.off("join:room");
        }
    }, [name, room, router, roomId]);

    return (
        <main>
            <div>Hello {name} in {room}</div>
            <div>{isConnected ? `Connected` : "Not Connected"}</div>
        </main>
    )   
}
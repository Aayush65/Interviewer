'use client'

import { createContext, useState } from "react"

type videoContextType = {
    name: string,
    setName: (name: string) => void,
    room: string,
    setRoom: (room: string) => void
}

const videoContext = createContext<videoContextType>({
    name: "",
    setName: () => {},
    room: "",
    setRoom: () => {},
})

const VideoContextProvider = ({ children }: { children: React.ReactNode}) => {

    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    const videoContextValue = { name, setName, room, setRoom };

    return (
        <videoContext.Provider value={videoContextValue}>
            {children}
        </videoContext.Provider>
    )
}

export { videoContext, VideoContextProvider }
'use client'

import { FormEvent, useContext, useEffect, useRef } from "react";
import { socket } from "./socket";
import { useRouter } from "next/navigation";
import { videoContext } from "./context/videoContext";

export default function Home() {

	const { name, setName, room, setRoom } = useContext(videoContext);
	const nameInputRef = useRef<HTMLInputElement>(null);
	const roomInputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	
	useEffect(() => {
		console.log("Running now");

		socket.on("join:room", data => {
			console.log(data);
			router.push(room);
		});

		socket.on("full:room", data => {
			console.log(data);
			alert("Room full");
			setRoom("");
		});

		if (room && name) {
			socket.emit("join:room", { name, room });
		}

		return () => {
			socket.off("join:room");
		};
	}, [room, name]);


	function generateId(length: number) {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		let result = '';
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	}

	function handleRoomCreation(e: FormEvent) {
		e.preventDefault();
		const roomVal = generateId(8);
		if (!roomVal || !nameInputRef.current?.value) {
			console.log("Room can't be created");
			return;
		};
		setRoom(roomVal);
		setName(nameInputRef.current.value);
	}

	function handleJoinRoom(e: FormEvent) {
		e.preventDefault();
		if (!roomInputRef.current?.value || !nameInputRef.current?.value) {
			console.log("Room can't be joined");
			return;
		};
		setRoom(roomInputRef.current.value);
		setName(nameInputRef.current.value);
	}

	return (
		<main className="flex flex-col justify-center items-center h-screen gap-10 lg:gap-20">
			<div className="flex justify-center items-center gap-2 p-5 border-2 border-gray-300 rounded-md">
				<p>Enter your Name: </p>
				<input type="text" ref={nameInputRef} placeholder="John Doe" className="border border-gray-300 p-2 bg-gray-100 rounded-md" />
			</div>
			<div className="flex gap-10 p-10 border-2 border-gray-300 rounded-md">
				<form className="flex flex-col gap-3 justify-center items-center" onSubmit={handleRoomCreation}>
					<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Create a Room</button>
				</form>
				<p className="border-2 border-gray-300"></p>
				<form className="flex flex-col gap-3 justify-center items-center" onSubmit={handleJoinRoom}>
					<input type="text" ref={roomInputRef} placeholder="Enter Room Code" className="border border-gray-300 p-2 bg-gray-100 rounded-md" />
					<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Join Room</button>
				</form>
			</div>
		</main>
	);
}

import express from 'express';
import { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import { config } from 'dotenv';
import { Server } from 'socket.io';

config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(cors())

app.get("/", (req: Request, res: Response) => res.send("Welcome to Interviewer API"));

io.on('connect', socket => {
    const id = socket.id;
    console.log(`A user connected with id: ${id}`);
    
    socket.on("join:room", member => {
        const { name, room } = member;
        console.log(`User ${name} joined room ${room}`);
        const roomSize = io.sockets.adapter.rooms.get(room)?.size;
        if (roomSize === 2) {
            socket.emit("full:room", { message: "Room is full" });
        } else {
            socket.join(room);
            io.to(room).emit("join:room", { id: socket.id, ...member, members: roomSize }); 
        }
    });
});


server.listen(process.env.PORT || 5000, () => {
    console.clear();
    console.log(`Listening on Port ${process.env.PORT || 5000}`)
});
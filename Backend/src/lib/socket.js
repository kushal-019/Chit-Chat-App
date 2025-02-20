import {Server} from 'socket.io'
import http from 'http'
import express from 'express';

const app = express();
const server = http.createServer(app);
const io = new Server(server , {
    cors:{
        origin : ["http://localhost:5173"],
    },
})

const userSocketMap = {};

export const FindsocketId=(userid)=>{
    return userSocketMap[userid];
}
io.on("connection" ,(socket)=>{
    console.log("user connected" , socket.id);

    const userid = socket.handshake.query.userid;
    if(userid){
        userSocketMap[userid] = socket.id;
    }
    io.emit("getOnlineUsers" , Object.keys(userSocketMap));
    
    socket.on("disconnect" ,()=>{
        console.log("user disconnected" , socket.id);
        delete userSocketMap[userid] ;
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})

export  {io , server , app};
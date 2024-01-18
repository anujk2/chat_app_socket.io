import express from "express";
import {createServer} from 'http';
import { Server } from "socket.io";
import cors from "cors";
const port = 3000;

const app = express();
const server = createServer(app);


const io = new Server(server,{
cors :{
    origin :"http://localhost:5173",
    methods:["GET","POST"],
    credentials:true,
}
});

app.use(cors({
    origin :"http://localhost:5173",
    methods:["GET","POST"],
    credentials:true,
}));


app.get("/", (req, res) => {
    res.send("Hello World");
});

io.on("connection", (socket) => {
    console.log("connected id=",socket.id);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log("User Joined Room: " + data);
    });
  
    socket.on("send_message", (data) => {
      console.log(data);
      socket.to(data.room).emit("receive_message", data.content);
    });
  
    socket.on("disconnect", () => {
      console.log("USER DISCONNECTED");
    });
  });

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

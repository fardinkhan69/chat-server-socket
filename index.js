const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
require('dotenv').config()
const { Server, Socket } = require("socket.io");
const port = process.env.PORT || 5000;
app.use(cors());

const server = http.createServer(app)


const io = new Server(server, {
  cors: {
    origin: "https://gallant-snyder-c618fb.netlify.app/",
    methods: ["GET", "POST"],
  },
});



io.on("connection",(socket) => {
  console.log(`user connected ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    
  });

  socket.on("disconnect",()=>{
    console.log("user disconnected",socket.id)
  })
})



server.listen(port,()=>{
  console.log("this server is running")
})
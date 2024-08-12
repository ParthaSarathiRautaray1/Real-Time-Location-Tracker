const express = require("express")
const path = require("path")
const app = express()


//implimentaion of socket io
const http = require("http")
const socketio = require("socket.io")
const server = http.createServer(app)
const io = socketio(server)

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname, "public")))


io.on("connection", function(socket){
    socket.on("send-location", function(data){
        io.emit("receive-location" , {id: socket.id, ...data})
    })
    socket.on("disconnect", function(){
        io.emit("user-disconnect", socket.id)
    })
})

app.get("/",function(req,res){
    res.render("index")

})


server.listen(3000)
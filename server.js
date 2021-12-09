const express = require('express');
const app = express();
const http = require('http');
const esbuild = require('esbuild');
const fs = require('fs')
const server = http.createServer(app)

const {Server} = require("socket.io")
const io = new Server(server)

function buildGame(){
    console.log("build game")
    let code = "";
	const template = fs.readFileSync("index.html", "utf-8");


	try {

		// build user code
		esbuild.buildSync({
			bundle: true,
			sourcemap: true,
			target: "es6",
			keepNames: true,
			logLevel: "silent",
			entryPoints: ["index.js"],
			outfile: "/dist/game.js",
		});
    } catch (e){
        console.log("cannot build")
    }
    code += `<script src="./dist/game.js"></script>\n`;
    fs.writeFileSync("index.html", template.replace("{{kaboom}}", code));
}
app.use("/dist",express.static("./dist/"))

app.get('/', (req,res) => {
    console.log("get file")
    buildGame()
    res.sendFile(__dirname + '/index.html')
})



var clients = {};

io.on("connection", (socket) => {
    console.log("User connected")

    socket.on("create", data => {

        const newClient = {
            posX: 0,
            posY: 0
        }

        clients[socket.id] = newClient
        const payload = {
            clients
        }
        // respond back to user
        socket.emit('update',payload)
        })
    })

const PORT = process.env.PORT || 9091
server.listen(PORT, () => console.log(`Listening ... on ${PORT}`));

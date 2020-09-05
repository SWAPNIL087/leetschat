var express = require("express");

var app = express();
var http = require("http").createServer(app);

var users = {};

var io = require("socket.io")(http);
//====================main function==========================

io.on("connection",function(socket){
	console.log("user connected",socket.id);
	//attching incoming listener for new user
	socket.on("user_connected",function(username,callback){//listening to the client(script)
		if(username in users){
			callback(false);
		}
		else{

			callback(true);

		users[username] = socket.id;
		console.log(users);
		updateusername(users);
		
		
		
		
	}
	});
	function updateusername(users){
			io.sockets.emit("user_connected",users);//sends it back to the script with name user_connected and variable users;		
		}

	//listen to client to send msg
	socket.on("send_message",function(data){//soclet.on listens to client 
		console.log(data);
		
		var socketId = users[data.receiver];
		console.log(socketId) 
		io.to(socketId).emit("new_message",data);//now send the event to the reciever i.e io.emit("message") gives it to all users
		
	})
	socket.on('disconnect',function(data){
		console.log("gone")
		var todel = Object.keys(users).find(key => users[key] === socket.id)
		console.log(todel)
		
			var prop = todel;
			delete users[prop];
		
		
		io.sockets.emit("specialupdate",users);
		
		
			

		
		
		
	});
});



//===========================================================
http.listen(8000,function(){
	console.log("server started");
});
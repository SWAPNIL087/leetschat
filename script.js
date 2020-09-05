var io = io("http://localhost:8000");
var receiver = ""
var sender =  ""
var count=0;
function enterName(){
	var name = document.getElementById("name").value;
	var nickError = document.getElementById("nickError");
	io.emit("user_connected",name,function(data){//sends the name ot the server along with a call back function data
		if(data){
			sender = name;
			var heading=document.getElementById("the_sender");
 	heading.innerHTML="<p>"+sender+"</p>"
	document.getElementById("display_control1").style.display = "none";
	document.getElementById("display_control2").style.display = "block";
	document.getElementById("logo").style.display = "none";
	
		}
		else{
			nickError.innerText="username taken try again!"
			document.getElementById("name").value=""

		}

	});//i.e io.emit() sends the name to server

	return false;

	//prevents the form from submitting;

}

var checker = []
var arr_of_user = [] 
io.on("user_connected",function(users){//listen from the server (i.e  io.on() listens to the server declared functions and define thm here in js)
 arr_of_user=[]

 console.log(users);
 console.log(Object.keys(users).length)

console.log(checker);
 for(var propt in users){
 	arr_of_user.push(propt);
 	if(checker.indexOf(propt)!=-1){
 		console.log("close!")
 	}
 		else{

 	if(propt!=sender){
	var html="";
 		
 		html = "<span id='dynamic' class="+propt+"><button class="+propt+" id='usernamebtn' onclick='onUserSelected(this.innerHTML)'>"+propt+"</button></span></br>";
 		
 		document.getElementById("users").innerHTML += html;
 		checker.push(propt)
 	}}
 		var id = propt;
		var div = '<div id='+id+' style="color:white;"></div>';
		document.getElementById("messages").innerHTML += div;
		document.getElementById(id).style.display = "none";
 		};
 		
 
	});
io.on('specialupdate',function(users){
	checker=[]
	document.getElementById("messages").innerHTML += "";
	document.getElementById('')
	document.getElementById("users").innerHTML = "";
	console.log("it started atleast!")
	arr_of_user=[]
 console.log(users);
 console.log(Object.keys(users).length)

console.log(checker);
 for(var propt in users){
 	arr_of_user.push(propt);
 	if(checker.indexOf(propt)!=-1){
 		console.log("close!")
 	}
 		else{

 	if(propt!=sender){
	var html="";
 		
 		html = "<span id='dynamic' class="+propt+"><button class="+propt+" id='usernamebtn' onclick='onUserSelected(this.innerHTML)'>"+propt+"</button></span></br>";
 		
 		document.getElementById("users").innerHTML += html;
 		checker.push(propt)
 	}}
 		var id = propt;
		var div = '<div id='+id+' style="color:white;"></div>';
		document.getElementById("messages").innerHTML += div;
		document.getElementById(id).style.display = "none";
 		};
	
})

function onUserSelected(username){

console.log(username);
receiver = username;
document.getElementById("reciever").innerHTML = "<p style='color:rgb(32,178,170);font-style: italic;'>"+receiver+"</p>";
for(var i=0;i<arr_of_user.length;i++){
	document.getElementById(arr_of_user[i]).style.display = "none";
}
setTimeout(function() {
	document.getElementById(username).style.display = "block";

	
}, 100);

}
function sendMessage(){
	var message = document.getElementById("message").value;
	//send this msg tonthe serrver
	io.emit("send_message",{
		sender:sender,
		receiver:receiver,
		message:message
	})
	//inorder to appedn ur own msgs too	
	var html = "";
	html +="<div id='sent'><span style='color:black;font-size:16px;'>You:</span><br><span style='color:green';>"+message+"</span></div>";
	document.getElementById(receiver).innerHTML += html;
 	
 	document.getElementById('message').value = "";
 	element = document.getElementById("messages");
 	element2 = document.getElementById("userlist_side");
 	element2.scrollTop = element2.scrollHeight - element2.clientHeight
 	element.scrollTop = element.scrollHeight - element.clientHeight;
	//prevent from overloading;
	return false;
}

//listen from the server
io.on('new_message',function(data){
	console.log(data);
	
	var html = "";
	html +="<div id='recieved'><span style='color:black;'>"+data.sender+ ":</span><br>"+data.message+"</div>";
	
	document.getElementById(data.sender).innerHTML += html;

})

anime({
   targets: '#display_control1' ,
   translateY: [
     { value: 200, duration: 1000 },
     { value: 0, duration: 1000 }
   ],
   rotate:{
     value: '1turn',
     easing: 'easeInOutSine'
   }
});    
anime({
   targets: '#logo' ,
   translateY: [
     { value: -200, duration: 2000 },
     { value: 0, duration: 1000 }
   ],
   rotate:{
     value: 0,
     easing: 'easeInOutSine'
   }
});
anime({
   targets: '#welcome' ,
   translateX: [
     { value: -200, duration: 2000 },
     { value: 0, duration: 1000 }
   ],
   rotate:{
     value: 0,
     easing: 'easeInOutSine'
   }
});
document.getElementById("logo").innerHTML = '<i class="fa fa-comments" style="color:#e29c45;font-size:100px;"></i>'


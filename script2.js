



function enterName(){
	localStorage.setItem("nam","")
	var nam = localStorage.getItem("NAME");
	if(nam.length==0){
		var name = [];
var daal = document.getElementById("name").value	
console.log(daal);

/*const ass=[];
ass.push("yo");
console.log(ass);*/
name.push(daal);
localStorage.setItem("NAME",JSON.stringify(name));
console.log(name);}
else{
	name = localStorage.getItem("NAME");
	var dal = document.getElementById("name").value;
	name.push(dal);
	localStorage.setItem("NAME",JSON.stringify(name));
}
return ;
}
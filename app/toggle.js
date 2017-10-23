var open=true;
function openNav(){
	if(open){
		document.getElementById("sideNav").style.width = "0";
    	document.getElementById("content").style.width= "100%";
    	open=false;
    }else{
    	document.getElementById("sideNav").style.width = "20%";
    	document.getElementById("content").style.width = "80%";
    	open=true
	}
}

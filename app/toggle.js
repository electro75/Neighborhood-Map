var open=true;
function openNav(){
	if(open){
		document.getElementById("sideNav").style.width = "0";
    	document.getElementById("content").style.width= "100%";
    	if(document.documentElement.clientWidth < 655){
    		document.getElementById("wthr-btn").style.display= "inline";
    	}
    	open=false;
    }else{
    	document.getElementById("sideNav").style.width = "350px";
    	document.getElementById("content").style.width = "80%";
    	if(document.documentElement.clientWidth < 655){
    		document.getElementById("wthr-btn").style.display= "none";
    	}
    	open=true
	}
}
function closeNav(){
    document.getElementById("sideNav").style.width = "0";
    document.getElementById("content").style.width= "100%";
}


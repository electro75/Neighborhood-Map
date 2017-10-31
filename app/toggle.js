// The sole purpose of this file is to make sure that the side-panel
// containing the list view toggles smoothly

var open=true;
function openNav(){     //triggered when hamburger icon is used to close the side-pane.
	if(open){
		document.getElementById("sideNav").style.width = "0";
    	document.getElementById("content").style.width= "100%";
    	if(document.documentElement.clientWidth < 655){                  
    		document.getElementById("wthr-btn").style.display= "inline"; 
    	}
    	open=false;
    }else{
        if(document.documentElement.clientWidth > 500){               //For a viewport width above 500px, width of an open side-panel is 350px,
        	document.getElementById("sideNav").style.width = "350px"; //While below 500px width of side-panel is 235px.
    	    document.getElementById("content").style.width = "80%";
        }else{
            document.getElementById("sideNav").style.width = "235px";
            console.log(document.documentElement.clientWidth);
            document.getElementById("content").style.width = "80%";
        }
    	if(document.documentElement.clientWidth < 655){
    		document.getElementById("wthr-btn").style.display= "none"; //for a viewport width below 655px, when the side-panel is open,
    	}                                                              //the weather button does not appear. It appears only when closed. 
    	open=true                                                      //refer to line 10.
	}
}
function closeNav(){                                            //for smaller viewports, when an infowindow is created, the side-panel is closed for
    document.getElementById("sideNav").style.width = "0";       //better readablity of the details in the infowdindow.
    document.getElementById("content").style.width= "100%";
    document.getElementById("wthr-btn").style.display= "inline";
}


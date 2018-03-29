var doc_ici=[];
var req = new XMLHttpRequest();
var stop=0;
function monCode() 
		{ 
		   if (req.readyState == 4) 
		   { 
				var doc = eval('(' + req.responseText + ')'); 
				doc_ici=doc;
		   }
			stop=stop+1;
			if(stop==3){
				   disp();
			}
		} 
		
		
function disp(){
	console.log(doc_ici);
}

window.onload = function(e){ 
	req.open("GET", "donnees.json", true); 
	req.onreadystatechange = monCode;   // la fonction de prise en charge
	req.send(null);
}



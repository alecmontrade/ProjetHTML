var doc_ici=[];
var req = new XMLHttpRequest();
function monCode() 
		{ 
		   if (req.readyState == 4) 
		   { 
				var doc = eval('(' + req.responseText + ')'); 
				
				console.log(doc);
				doc_ici=doc;
		   }
		   
		} 

window.onload = function(e){ 

	req.open("GET", "donnees.json", true); 
	req.onreadystatechange = monCode;   // la fonction de prise en charge
	req.send(null);
	console.log(doc_ici);
	//console.log(doc.mesRecettes[0].titre);
	
	https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
	
}



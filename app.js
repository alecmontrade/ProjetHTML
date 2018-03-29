

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
		
		
		
function changeTri(mainIngredients,doc){
	
	$('.tri').append('<input type="button" class="bouton" id="all" value="all" >');
	var element = document.getElementById("all");
	element.addEventListener('click', function(e) {
		doc.forEach(function(b) {
			b.disp=true;
		});
		console.log(doc);
	});
			
			
	$.each(mainIngredients,function(index){
		$('.tri').append('<input type="button" class="bouton" id="'+mainIngredients[index]+'" value="'+mainIngredients[index]+'">');
		var element = document.getElementById(mainIngredients[index]);
		element.addEventListener('click', function(e) {
			doc.forEach(function(b) {
				b.disp=false;
				b.ingredients.forEach(function(c) {
					if(c.titre==e.target.getAttribute('id')){
						b.disp=true;
					}
				});
			});
			console.log(doc);
		});
	});
}


		
function disp(){
	//console.log(doc_ici);
	var triIngredients={};
	var mainIngredients=[];
	
	doc_ici.forEach(function(b) {
		b.ingredients.forEach(function(c) {
			if(!(triIngredients[c.titre]>=0)){
				//triIngredients.push(c.titre);
				triIngredients[c.titre]=1;
			} else {
				triIngredients[c.titre]=triIngredients[c.titre]+1;
			}
		});
		
	});
	
	console.log(triIngredients);
	
	// -------- TRI TABLEAU --------
	valeurs = Object.values(triIngredients);
	clefs = Object.keys(triIngredients);
	for(i=0; i<valeurs.length; i++){
	  for(j=0;j<valeurs.length-1;j++){
		if (valeurs[j]<valeurs[j+1]){
		  a = valeurs[j];
		  valeurs[j] = valeurs[j+1];
		  valeurs[j+1] = a;
		 
		  b = clefs[j];
		  clefs[j] = clefs[j+1];
		  clefs[j+1] = b;
		}
	  }
	}
	
	// -------- seulement les 5 ingredients principaux -------
	for(var i=0;i<5;i++){
		mainIngredients.push(clefs[i]);
	}
	console.log(mainIngredients);
	
	$('.recettes').before('<div class="tri"></div>');
	
	changeTri(mainIngredients,doc_ici);
	
	
	
}

window.onload = function(e){
		req.open("GET", "donnees.json", true); 
		req.onreadystatechange = monCode;   // la fonction de prise en charge
		req.send(null);
}





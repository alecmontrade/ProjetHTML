

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
	
	$('.tri').append('<input type="button" class="bouton btn btn-primary" id="all" value="all" >');
	var element = document.getElementById("all");
	element.addEventListener('click', function(e) {
		doc.forEach(function(b) {
			b.disp=true;
		});
		disp();
		console.log(doc);
	});
			
			
	$.each(mainIngredients,function(index){
		$('.tri').append('<input type="button" class="bouton btn btn-primary" id="'+mainIngredients[index]+'" value="'+mainIngredients[index]+'">');
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
			disp();
			console.log(doc);
		});
	});
}


		
function disp(){
	$("body").empty();
	var recettes = document.createElement("div");
        recettes.setAttribute("class", "recettes ");
        recettes.setAttribute("style", "margin: 0 auto; width: 80%;");
	console.log(doc_ici);
        doc_ici.forEach(function(e){
            
			if(e.disp==true){
				var recette = document.createElement("div");
				var recetteTexte = document.createElement("div");
				
				recette.setAttribute("class", "card text-center ");
				recette.setAttribute("style", "");
				recetteTexte.setAttribute("class", "card-body");
				
				
				var recetteTitre = document.createElement("h5");
				recetteTitre.setAttribute("class", "card-title display-2");
				recetteTitre.textContent=e.titre;
				recetteTexte.appendChild(recetteTitre);
				
				var badgeprix=document.createElement("span");
				badgeprix.setAttribute("class","badge badge-danger");
				badgeprix.textContent=e.prix;
				recetteTexte.appendChild(badgeprix);

				var badgetemps=document.createElement("span");
				badgetemps.setAttribute("class","badge badge-primary");
				badgetemps.textContent=e.tps+" min";
				recetteTexte.appendChild(badgetemps);

				var badgedifficulte=document.createElement("span");
				badgedifficulte.setAttribute("class","badge badge-secondary");
				badgedifficulte.textContent=e.difficulte;
				recetteTexte.appendChild(badgedifficulte);
				
				var recettePar = document.createElement("p");
				recettePar.setAttribute("class", "card-text");
				recettePar.textContent=e.enTete;
				recetteTexte.appendChild(recettePar);
				
				recette.appendChild(recetteTexte);
				
				var recetteImg = document.createElement("img");
				recetteImg.setAttribute("class", "card-img-bottom");
				recetteImg.setAttribute("src", e.img);
				recetteImg.setAttribute("alt", e.titre);
				recette.appendChild(recetteImg);
				
				var recetteBtn = document.createElement("a");
				recetteBtn.setAttribute("class", "btn btn-outline-danger");
				recetteBtn.setAttribute("href", "recette.html?id="+e.id);
				recetteBtn.textContent="Voir la recette";
				recette.appendChild(recetteBtn);
				   
				
				
				recettes.appendChild(recette);
				var br=document.createElement("BR");
				recettes.appendChild(br);
            }
        })
        
        
        document.body.appendChild(recettes);
	
	
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






//----- ----- INIT VARIABLES ----- -----

var doc_ici=[];
var req = new XMLHttpRequest();
var stop=0;




function monCode(){ 
	   if (req.readyState == 4) 
	   { 
			var doc = eval('(' + req.responseText + ')'); 
			doc_ici=doc; //stockage des infos dans variable globale doc_ici
	   }
	   stop=stop+1;
		if(stop==3){ 
			disp(); //lecture du fichier terminée
		}
		
	} 
		
		
		
		
function changeTri(mainIngredients,doc){
	
	//---------- ---------- AFFICHAGE BOUTONS TRI PAR INGREDIENT ---------- ----------
	
	//----- ----- BOUTON ALL ----- -----
	
	$('.tri').append('<input type="button" class="bouton btn btn-primary" id="all" value="all" >');
	var element = document.getElementById("all");
	
	element.addEventListener('click', function(e) {
		doc.forEach(function(b) {
			b.disp=true; //afficher toute les recettes au clic sur le bouton
		});
		disp();
		console.log(doc);
	});
			
	//----- ----- AUTRES BOUTONS ----- -----
			
	$.each(mainIngredients,function(index){
		$('.tri').append('<input type="button" class="bouton btn btn-primary" id="'+mainIngredients[index]+'" value="'+mainIngredients[index]+'">');
		var element = document.getElementById(mainIngredients[index]);
		
		element.addEventListener('click', function(e) {
			doc.forEach(function(b) {
				b.disp=false;
				b.ingredients.forEach(function(c) {
					if(c.titre==e.target.getAttribute('id')){
						b.disp=true; //si ingredient dans la recette, l'afficher
					}
				});
			});
			disp(); //réafficher la page avec nouvelles valeurs de disp
			console.log(doc);
		});
		
	});
}



		
function disp(){
	$("body").empty(); //a chaque modification, tout le body est vidé puis rempli
	
	//---------- ---------- AFFICHAGE PAGE ---------- ----------
	
	//----- ----- HEADER ----- -----
    
    var header = document.createElement("header");
    
	var divLogo=document.createElement("div");
	divLogo.setAttribute("class", "divImg");
	header.appendChild(divLogo);
	
    var imagelogo = document.createElement("img")
    imagelogo.setAttribute("class", "text-center img");
    imagelogo.setAttribute("src", "img/logobbq.png");
    divLogo.appendChild(imagelogo);
    
	
	var divTitle=document.createElement("div");
    divTitle.setAttribute("class","title");
	header.appendChild(divTitle);
    
    var descpage = document.createElement("h1")
    descpage.setAttribute("class", "text-center display-4");
    descpage.textContent="LES MEILLEURES RECETTES DE BBQ AU MONDE!!";
    divTitle.appendChild(descpage);
       
    var traitpage = document.createElement("HR");
    header.appendChild(traitpage);
    
    document.body.appendChild(header);
    
	
	//----- ----- RECETTES ----- -----
    
	var recettes = document.createElement("div");
        recettes.setAttribute("class", "recettes ");
        recettes.setAttribute("style", "margin: 0 auto; width: 50%;");
	console.log(doc_ici);
	
	doc_ici.forEach(function(e){ //pour chaque recette
	   
		if(e.disp==true){
			
			var recette = document.createElement("div");
			var recetteTexte = document.createElement("div");
			
			recette.setAttribute("class", "card text-center ");
			recette.setAttribute("style", "");
			recetteTexte.setAttribute("class", "card-body");
			
			
			var recetteTitre = document.createElement("h5");
			recetteTitre.setAttribute("class", "card-title display-4");
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
		
		
	//----- ----- FOOTER ----- -----
	
	
    var footer = document.createElement("footer");
    
    var traitfinpage = document.createElement("HR");
    footer.appendChild(traitfinpage);
    
    var descfinpage = document.createElement("p")
    descfinpage.setAttribute("class", "text-center");
    descfinpage.textContent=" Site web réalisé par Dyvia Fleury, Alec Montrade et Enzo Contini dans le cadre du cours de HTML5. ";
    footer.appendChild(descfinpage);
      
    document.body.appendChild(footer);
    
	
	
	//---------- ---------- TRI PAR INGREDIENT ---------- ----------
	
	var triIngredients={};
	var mainIngredients=[];
	
	//----- ----- INIT TABLEAU INGREDIENTS ----- -----
	
	doc_ici.forEach(function(b) {
		b.ingredients.forEach(function(c) {
			if(!(triIngredients[c.titre]>=0)){ 
				triIngredients[c.titre]=1;
			} else {
				triIngredients[c.titre]=triIngredients[c.titre]+1;
			}
		});
		
	});
	
	
	//----- ----- TRI TABLEAU INGREDIENTS ----- -----
	
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
	
	
	
	for(var i=0;i<5;i++){ //isolation 5 ingredients principaux
		mainIngredients.push(clefs[i]);
	}
	
	$('.recettes').before('<div class="tri"></div>'); 
	
	
	changeTri(mainIngredients,doc_ici); //affiche les boutons de tri
	
}




window.onload = function(e){
		req.open("GET", "donnees.json", true); 
		req.onreadystatechange = monCode;   // Lecture du fichier JSON
		req.send(null);
}





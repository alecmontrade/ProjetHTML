var doc_ici=[];
var req = new XMLHttpRequest();
var stop=0;
var marecette;
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
        
        
        var recettes = document.createElement("div");
        recettes.setAttribute("class", "recettes ");
        recettes.setAttribute("style", "margin: 0 auto; width: 80%;");
	console.log(doc_ici);
        for(var i = 0 ; i<3 ; i++){
            
            marecette=doc_ici[i];
            console.log(marecette);
            var recette = document.createElement("div");
            var recetteTexte = document.createElement("div");
            
            recette.setAttribute("class", "card text-center ");
            recette.setAttribute("style", "");
            recetteTexte.setAttribute("class", "card-body");
            
            
            var recetteTitre = document.createElement("h5");
            recetteTitre.setAttribute("class", "card-title display-2");
            recetteTitre.textContent=marecette.titre;
            recetteTexte.appendChild(recetteTitre);
            
            var badgeprix=document.createElement("span");
            badgeprix.setAttribute("class","badge badge-danger");
            badgeprix.textContent=marecette.prix;
            recetteTexte.appendChild(badgeprix);

            var badgetemps=document.createElement("span");
            badgetemps.setAttribute("class","badge badge-primary");
            badgetemps.textContent=marecette.tps+" min";
            recetteTexte.appendChild(badgetemps);

            var badgedifficulte=document.createElement("span");
            badgedifficulte.setAttribute("class","badge badge-secondary");
            badgedifficulte.textContent=marecette.difficulte;
            recetteTexte.appendChild(badgedifficulte);
            
            var recettePar = document.createElement("p");
            recettePar.setAttribute("class", "card-text");
            recettePar.textContent=marecette.enTete;
            recetteTexte.appendChild(recettePar);
            
            recette.appendChild(recetteTexte);
            
            var recetteImg = document.createElement("img");
            recetteImg.setAttribute("class", "card-img-bottom");
            recetteImg.setAttribute("src", marecette.img);
            recetteImg.setAttribute("alt", marecette.titre);
            recette.appendChild(recetteImg);
            
            var recetteBtn = document.createElement("a");
            recetteBtn.setAttribute("class", "btn btn-outline-danger");
            recetteBtn.setAttribute("href", "recette.html?id="+marecette.id);
            recetteBtn.textContent="Voir la recette";
            recette.appendChild(recetteBtn);
               
            
            
            recettes.appendChild(recette);
            var br=document.createElement("BR");
            recettes.appendChild(br);
            
            

            
                    
		
                //cpt++;
		
	}
        
        document.body.appendChild(recettes);
        
        
}

window.onload = function(e){ 
	req.open("GET", "donnees.json", true); 
	req.onreadystatechange = monCode;   // la fonction de prise en charge
	req.send(null);
}

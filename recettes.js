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
        recettes.setAttribute("class", "recettes");
	console.log(doc_ici);
        for(var i = 0 ; i<3 ; i++){
            
            marecette=doc_ici[i];
            console.log(marecette);
            var recette = document.createElement("div");
            var recetteTexte = document.createElement("div");
            
            recette.setAttribute("class", "card text-center col-md-6");
            recette.setAttribute("style", "width: 80%; ");
            recetteTexte.setAttribute("class", "card-body");
            
            
            var recetteTitre = document.createElement("h5");
            recetteTitre.setAttribute("class", "card-title");
            recetteTitre.textContent=marecette.titre;
            recetteTexte.appendChild(recetteTitre);
            
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
            recetteBtn.setAttribute("class", "btn btn-primary");
            recetteBtn.setAttribute("href", "recette?id="+marecette.id);
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






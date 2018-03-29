window.onload = function () {

	

	
	for(var i = 0 ; i<3 ; i++){
            var recette = document.createElement("div");
            var recetteTexte = document.createElement("div");
            
            recette.setAttribute("class", "card");
            recetteTexte.setAttribute("class", "card-body");
            
            
            var recetteTitre = document.createElement("h5");
            recetteTitre.setAttribute("class", "card-title");
            recetteTitre.textContent="ici le titre de la recette"
            recetteTexte.appendChild(recetteTitre);
            
            var recettePar = document.createElement("p");
            recettePar.setAttribute("class", "card-text");
            recettePar.textContent="Avec cette recette vous deviendrez le meilleur cuisinier de barbecue. Vous pourrez impressionner vous invitées."
            recetteTexte.appendChild(recettePar);
            
            recette.appendChild(recetteTexte);
            
            var recetteImg = document.createElement("img");
            recetteImg.setAttribute("class", "card-img-bottom");
            recetteImg.setAttribute("src", "img/bbq.jpg");
            recetteImg.setAttribute("alt", "une image de recette");
            recette.appendChild(recetteImg);
            
            
            document.body.appendChild(recette);

            
                    
		
                //cpt++;
		
	}
        
}


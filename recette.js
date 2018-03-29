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
    
    //Récupération de l'ID de la recette sélectionnée
    function getParameterURL(){
        var url = window.location.search;
        var retour = url.substring(url.lastIndexOf("=")+1);
        return retour;
    }
    
    var id = getParameterURL();
    
    doc_ici.forEach(function(c){
        if(c.id==id){
            titre=c.titre;
            img=c.img;
            enTete=c.enTete;
            prix=c.prix;
            tps=c.tps;
            difficulte=c.difficulte;
            ingredients=c.ingredients;
            etapes=c.etapes;
        }
    });
    
    var recetteglobale=document.createElement("div");
    
    recetteglobale.setAttribute("style", "margin: 0 auto; width: 80%;");
    recetteglobale.setAttribute("class", "text-center recetteglobale");
    
    var titrerecette=document.createElement("h2");
    titrerecette.setAttribute("class","titrerecette display-2");
    titrerecette.textContent=titre;
    recetteglobale.appendChild(titrerecette);
    
    var descrecette=document.createElement("h5");
    descrecette.setAttribute("class","descrecette");
    descrecette.textContent=enTete;
    recetteglobale.appendChild(descrecette);
    
    var badgeprix=document.createElement("span");
    badgeprix.setAttribute("class","badge badge-danger");
    badgeprix.textContent=prix;
    recetteglobale.appendChild(badgeprix);
    
    var badgetemps=document.createElement("span");
    badgetemps.setAttribute("class","badge badge-primary");
    badgetemps.textContent=tps+" min";
    recetteglobale.appendChild(badgetemps);
    
    var badgedifficulte=document.createElement("span");
    badgedifficulte.setAttribute("class","badge badge-secondary");
    badgedifficulte.textContent=difficulte;
    recetteglobale.appendChild(badgedifficulte);
    
    var retourligne=document.createElement("br");
    recetteglobale.appendChild(retourligne);
    
    var imgrecette=document.createElement("img");
    imgrecette.setAttribute("class","imgcrecette img-fluid img-thumbnail");
    imgrecette.setAttribute("src", img);
    imgrecette.setAttribute("alt", "Image de la recette");
    recetteglobale.appendChild(imgrecette);
    
    var texteingredientdebut=document.createElement("h2");
    texteingredientdebut.textContent="Liste des ingrédient(s)";
    recetteglobale.appendChild(texteingredientdebut);
    
    
    ingredients.forEach(function(a){
            var ingredient = document.createElement("div");
            var ingredientTexte = document.createElement("div");
            
            ingredient.setAttribute("class", "card");
            ingredient.setAttribute("style", "width: 18rem");
            ingredientTexte.setAttribute("class", "card-body");
            
            var ingredientimg = document.createElement("img");
            ingredientimg.setAttribute("class", "card-img-bottom width: 10% height: 10%");
            ingredientimg.setAttribute("id", "imageingredient");
            ingredientimg.setAttribute("src", a.img);
            ingredientimg.setAttribute("alt", "Une image d'ingrédient");
            ingredient.appendChild(ingredientimg);
            
            
            var ingredientTitre = document.createElement("p");
            ingredientTitre.setAttribute("class", "card-title");
            ingredientTitre.setAttribute("id", "texteingredient");
            ingredientTitre.textContent=a.titre;
            ingredientTexte.appendChild(ingredientTitre);
            ingredient.appendChild(ingredientTexte);
                    
        
            recetteglobale.appendChild(ingredient);
    });
    
    etapes.forEach(function(a){
            
            var titredesc=document.createElement("h2");
            titredesc.setAttribute("class","display-4");
            titredesc.textContent=a.titre;
            recetteglobale.appendChild(titredesc);

            var descrecette=document.createElement("h5");
            descrecette.setAttribute("class","descrecette");
            descrecette.textContent=a.desc;
            recetteglobale.appendChild(descrecette);

    });
    
        
    
            document.body.appendChild(recetteglobale);

}

window.onload = function(e){ 
	req.open("GET", "donnees.json", true); 
	req.onreadystatechange = monCode;   // la fonction de prise en charge
	req.send(null);
}






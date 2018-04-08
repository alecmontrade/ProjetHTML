
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
		
		

		
function disp(){
	
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
	
	
	//----- ----- RECETTE ----- -----
    
    //Récupération de l'ID de la recette sélectionnée
    function getParameterURL(){
        var url = window.location.search;
        var retour = url.substring(url.lastIndexOf("=")+1);
        return retour;
    }
    
    var id = getParameterURL();
    
    doc_ici.forEach(function(c){ //recuperation données recette
        if(c.id==id){
            titre=c.titre;
            img=c.img;
            enTete=c.enTete;
            prix=c.prix;
            tps=c.tps;
            difficulte=c.difficulte;
            ingredients=c.ingredients;
            etapes=c.etapes;
            video=c.vid;
        
    }});
    
    var recetteglobale=document.createElement("div");
    
    recetteglobale.setAttribute("style", "margin: 0 auto; width: 50%;");
    recetteglobale.setAttribute("class", "text-center recetteglobale");
    
    var titrerecette=document.createElement("h2");
    titrerecette.setAttribute("class","titrerecette display-4");
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
    
     var affIngredients=document.createElement("div");
    affIngredients.setAttribute("class","ingredients");
    
    var texteingredientdebut=document.createElement("h2");
    texteingredientdebut.textContent="Liste des ingrédient(s)";
    affIngredients.appendChild(texteingredientdebut);
    
   
    //----- ----- INGREDIENTS ----- -----
    
    ingredients.forEach(function(a){
            var ingredient = document.createElement("div");
            var ingredientTexte = document.createElement("div");
            
            ingredient.setAttribute("class", "card  w-100");
            //ingredient.setAttribute("style", "width: 12rem");
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
                    
        
            affIngredients.appendChild(ingredient);
    });
    
    recetteglobale.appendChild(affIngredients);
	
	//----- ----- ETAPES PREPARATION ----- -----
    
    var affEtapes=document.createElement("div");
    affEtapes.setAttribute("class","etapes");
    
    etapes.forEach(function(a){
            
            
            var titredesc=document.createElement("h4");
            titredesc.setAttribute("class","display-5");
            titredesc.textContent=a.titre;
            affEtapes.appendChild(titredesc);

            var descrecette=document.createElement("h6");
            descrecette.setAttribute("class","descrecette");
            descrecette.textContent=a.desc;
            affEtapes.appendChild(descrecette);

    });
    
    
	recetteglobale.appendChild(affEtapes);
	
	//----- ----- VIDEO ----- -----
	
	var titreVideo=document.createElement("h2")
	titreVideo.setAttribute("class","titrevideo");
	titreVideo.textContent="Une petite video pour vous aider : ";
	recetteglobale.appendChild(titreVideo);
	
	var affvideo=document.createElement("video");
	affvideo.setAttribute("class","video");
	affvideo.setAttribute("src",video);
	affvideo.setAttribute("controls","controls");
	

	recetteglobale.appendChild(affvideo);

	document.body.appendChild(recetteglobale);
	
	//----- ----- FOOTER ----- -----
			
	var footer = document.createElement("footer");
    
    var traitfinpage = document.createElement("HR");
    footer.appendChild(traitfinpage);
    
    var descfinpage = document.createElement("p")
    descfinpage.setAttribute("class", "text-center");
    descfinpage.textContent=" Site web réalisé par Dyvia Fleury, Alec Montrade et Enzo Contini dans le cadre du cours de HTML5. ";
    footer.appendChild(descfinpage);
       
    document.body.appendChild(footer);

}




window.onload = function(e){
		req.open("GET", "donnees.json", true); 
		req.onreadystatechange = monCode;   // Lecture du fichier JSON
		req.send(null);	
}






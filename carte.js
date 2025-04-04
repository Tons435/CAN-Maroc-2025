// Fonction pour initialiser la carte
function initializeMap() {
    // Coordonnées du centre de la carte (Maroc)
    const center = [31.7917, -7.0926];
    const zoomLevel = 6;
  
    // Création de la carte
    const map = L.map("mapid").setView(center, zoomLevel);
  
    // Création de la couche OpenStreetMap
    const osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors",
    });
  
    // Création de la couche Watercolor
    const watercolorLayer = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
      attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    });
  
    // Ajout des couches de fond au contrôle de couches
    const baseLayers = {
      "OpenStreetMap": osmLayer,
      "Watercolor": watercolorLayer,
    };
  
    // Ajout du contrôle des couches pour basculer entre OpenStreetMap et Watercolor
    L.control.layers(baseLayers).addTo(map);
  
    // Ajouter la couche OpenStreetMap par défaut
    osmLayer.addTo(map);
  
    
  
    // Création d'une couche GeoJSON qui appelle le fichier « africa.geojson »
var africa = $.getJSON("africa.geojson", function (dataAfrica) {
  L.geoJson(dataAfrica, {
    style: function (feature) {
      // Vérification de l'attribut 'etat'
      if (feature.properties.etat === 'qualifié') {
        return {
          color: "#046380", // Couleur de la bordure
          weight: 1, // Épaisseur de la bordure
          fillColor: "green",  // Couleur de remplissage verte pour les surfaces qualifiées
          fillOpacity: 0.5, // Opacité du remplissage
        };
      } else {
        return {
          color: "#046380", // Couleur de la bordure
          weight: 1, // Épaisseur de la bordure
          fillColor: "#FF6B6B",  // Couleur de remplissage rouge clair pour les surfaces non qualifiées
          fillOpacity: 0.5, // Opacité du remplissage
        };
      }
    },
    
  }).addTo(map);

  // création d’une couche geoJson qui appelle le fichier « cinema.geojson »
var cinema= $.getJSON("capitale.geojson",function(dataville)
// icone Clap
{var iconeville = L.icon({
iconUrl : 'ville.jpg',
iconSize : [19, 21]
});
// fonction pointToLayer qui ajoute la couche « cinema » à la carte, selon la symbologie « iconeCinema », et paramètre la popup
L.geoJson(dataville,{
pointToLayer : function(feature,latlng){
var marker = L.marker(latlng,{icon: iconeville});
marker.bindPopup('<b><u>Description du Pays</u></b><br>'
+ '<b>Pays : </b>' + feature.properties.africa_NAME_FR + '<br>'
+ '<b>capital: </b>' + feature.properties.ville + '<br>'
+ '<b>Population : </b>' + feature.properties.Population + '<br>'
+ '<b>Superficie(km2) : </b>' + feature.properties.africa_Surface + '<br>'
// + '<b>Adresse : </b>' + feature.properties.adresse + '<br>'

);
return marker ;
}
}).addTo(map);
});

  // Ajout d'une légende
  const legend = L.control({ position: "bottomright" });
  legend.onAdd = function (map) {
    const div = L.DomUtil.create("div", "info legend");
    div.style.backgroundColor = "white"; // Fond blanc pour la légende
    div.style.padding = "10px"; // Espacement intérieur
    div.style.border = "1px solid #ccc"; // Bordure légère
    div.style.borderRadius = "5px"; // Coins arrondis
    div.style.boxShadow = "0 0 5px rgba(0,0,0,0.2)"; // Ombre légère
    div.innerHTML = `
      <b>Légende</b><br>
      <div style="display: flex; align-items: center; margin-top: 5px;">
        <div style="background: green; width: 20px; height: 20px; margin-right: 5px; opacity: 0.5;"></div>
        Qualifié
      </div>
      <div style="display: flex; align-items: center; margin-top: 5px;">
        <div style="background: #FF6B6B; width: 20px; height: 20px; margin-right: 5px; opacity: 0.5;"></div>
        Non qualifié
      </div>
    `;
    return div;
  };
  legend.addTo(map);
});

  
    // Ajout d'une légende
    const legend = L.control({ position: "bottomright" });
    legend.onAdd = function (map) {
      const div = L.DomUtil.create("div", "info legend");
      div.innerHTML = "<b>COUPE D'AFRIQUE DES NATIONS</b><br>⚽ MAROC 2025";
      return div;
    };
    legend.addTo(map);
  }
  
  // Appel de la fonction pour initialiser la carte
  document.addEventListener("DOMContentLoaded", initializeMap);
  
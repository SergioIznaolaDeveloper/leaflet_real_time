
const map = L.map("map").setView(
  [34.054131, -118.233482] /*cordenadas*/,
  13 /*zoom*/
);
const token =
  "pk.eyJ1Ijoic2VyZ2lvaXpuYW9sYWRldmVsb3BlciIsImEiOiJjbDAwcjY0ZXkwYWJ2M3BvMmpxMXAzY2ZuIn0.InEvD3G_M39EtUA_1dTyug";

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/outdoors-v11" /*Si cambias id por estilos de mapbox cambia la capa del mapa*/,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: token,
  }
).addTo(map);

/*Llamado*/

async function getCars() {
  try {

    let response = await fetch(
      "https://api.metro.net/agencies/lametro/vehicles/"
    );
    let data = await response.json();

    for (i = 0; i < data.items.length; i++) {
      let latitud = data.items[i].latitude;
      let longitud = data.items[i].longitude;
      let marker = L.circle([latitud, longitud], {
        color: "white",
        fillColor: "green",
        fillOpacity: 0.8,
        radius: 50,
      }).addTo(map);
      let id = data.items[i].id;
      marker.bindPopup("ID - " + id)
      setTimeout(()=>marker.remove(),5000);
    }
  } catch (error) {
    console.log(`ERROR Error: ${error.stack}`);
  }
}
getCars()
setInterval(()=>getCars(),5000)


async function getRail() {
    try {
      let response = await fetch(
        "https://api.metro.net/agencies/lametro-rail/vehicles/"
      );
      let data = await response.json();
  
      for (i = 0; i < data.items.length; i++) {
        let latitud = data.items[i].latitude;
        let longitud = data.items[i].longitude;
        let circle = L.circle([latitud, longitud], {
              color: "white",
              fillColor: "purple",
              fillOpacity: 0.8,
              radius: 50,
            }).addTo(map);
        let id = data.items[i].id;
        circle.bindPopup("ID - " + id)
        setTimeout(()=>circle.remove(),5000);
      }
    } catch (error) {
      console.log(`ERROR Error: ${error.stack}`);
    }
  }

setInterval(()=>getRail(),5000)


/*Marcador*/
// var marker = L.marker([40.6159, -4.001]).addTo(map);

/*Círculo*/
// var circle = L.circle([40.6159, -4.0011], {
//   color: "white",
//   fillColor: "purple",
//   fillOpacity: 0.2,
//   radius: 1500,
// }).addTo(map);

/*Polígono*/

// var polygon = L.polygon([
//   [40.62, -4.002],
//   [40.61, -4.001],
//   [40.6, -4.003],
// ]).addTo(map);

/*popups*/
// marker
//   .bindPopup("<b>Aqui cerquita estoy")
//   .openPopup(); /*sale por defecto el popup*/
// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");

/*trabajar con eventos = cordenadas con click*/

// function onMapClick(e) {
//     alert("You clicked the map at " + e.latlng);
// }

// map.on('click', onMapClick);

/*popup al click*/

// const popup = L.popup();
// function onMapClick(e) {
//   popup
//     .setLatLng(e.latlng)
//     .setContent("You clicked the map at " + e.latlng.toString())
//     .openOn(map);
// }
// map.on("click", onMapClick);

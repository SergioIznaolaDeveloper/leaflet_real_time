// Crear mapa

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
      marker.bindPopup("ID - " + id);
      setTimeout(() => marker.remove(), 5000);
    }
  } catch (error) {
    console.log(`ERROR Error: ${error.stack}`);
  }
}
getCars();//segundo 0
setInterval(() => getCars(), 5000);

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
      circle.bindPopup("ID - " + id);
      setTimeout(() => circle.remove(), 5000);
    }
  } catch (error) {
    console.log(`ERROR Error: ${error.stack}`);
  }
}


getRail();//segundo 0
setInterval(() => getRail(), 5000);


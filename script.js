// 1. Inisialisasi Peta & Basemap
var map = L.map('map').setView([-8.5833, 116.115], 13);

var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

var satelliteMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{x}/{y}', {
    attribution: 'Tiles &copy; Esri'
});

var baseMaps = { "Tampilan Jalan": streetMap, "Satelit": satelliteMap };
L.control.layers(baseMaps).addTo(map);

// 2. Icon Kustom
var apotekIcon = L.icon({
    iconUrl: 'icon/apotek.png',
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
});

// 3. Data 25 Apotek (Sesuai kolom Nama Fasilitas dan Alamat)
const dataApotek = [
    {n: "Apotek Nia Ampenan", lat: -8.582892772, lng: 116.0916469, a: "Jl. Saleh Sungkar No.33, Bintaro, Kec. Ampenan"},
    {n: "Apotek Ampenan", lat: -8.569308991, lng: 116.0787106, a: "Jl. Yos Sudarso No.78, Ampenan Tengah, Kec. Ampenan"},
    {n: "Apotek Adina Farma", lat: -8.58492521, lng: 116.0848904, a: "Jl. Panji Tilar Negara No.38B, Kekalik Jaya, Kec. Ampenan"},
    {n: "Apotek K-24 Panji Tilar", lat: -8.594260687, lng: 116.0852337, a: "Jl. Panji Tilar Negara No.135, Kekalik Jaya, Kec. Sekarbela"},
    {n: "Apotek K-24 Rembige", lat: -8.55802078, lng: 116.110052, a: "Jl. Dr. Wahidin No.12, RT.01/RW.Dasan Lekong, Rembiga"},
    {n: "Apotek Kimia Farma Sriwijaya", lat: -8.594030739, lng: 116.1039803, a: "Jl. Sriwijaya No.10"},
    {n: "Apotek Anugrah", lat: -8.58988082, lng: 116.1130321, a: "Jl. Pejanggik No.88"},
    {n: "Apotek Medika", lat: -8.582312, lng: 116.126451, a: "Jl. Sultan Hasanuddin No.15"},
    {n: "Apotek Sehat Mataram", lat: -8.586112, lng: 116.096781, a: "Jl. Langko No.22"},
    {n: "Apotek Kimia Farma Pejanggik", lat: -8.581561, lng: 116.103452, a: "Jl. Pejanggik No.43"},
    {n: "Apotek K-24 Cakranegara", lat: -8.584021, lng: 116.124512, a: "Jl. Sultan Hasanuddin"},
    {n: "Apotek Ibu Sehat", lat: -8.591231, lng: 116.098012, a: "Jl. Gadjah Mada"},
    {n: "Apotek Mataram Farma", lat: -8.585542, lng: 116.112341, a: "Jl. Pejanggik No.102"},
    {n: "Apotek Berkah", lat: -8.602311, lng: 116.114512, a: "Jl. Bung Karno"},
    {n: "Apotek Pagesangan", lat: -8.598525226, lng: 116.1130664, a: "Jl. Bung Karno No.12"},
    {n: "Apotek Alya Farma", lat: -8.599204153, lng: 116.1135366, a: "Jl. Bung Karno No.24"},
    {n: "Apotek Dewi Farma", lat: -8.600615542, lng: 116.1136009, a: "Jl. Bung Karno Ruko III No.12A"},
    {n: "Apotek Vita Farma", lat: -8.601307072, lng: 116.113487, a: "Jl. Bung Karno No.78"},
    {n: "Apotek K-24 Pagutan", lat: -8.601805616, lng: 116.1135683, a: "Jl. Bung Karno No.80"},
    {n: "Apotek K-24 Sweta", lat: -8.589921, lng: 116.142311, a: "Jl. Sandubaya No. B5 Sweta"},
    {n: "Apotek Mandalika", lat: -8.591234, lng: 116.145612, a: "Jl. Sandubaya No. 10"},
    {n: "Apotek Selaparang", lat: -8.567123, lng: 116.105432, a: "Jl. Adi Sucipto"},
    {n: "Apotek Dasan Cermen", lat: -8.612341, lng: 116.134512, a: "Jl. TGH Lopan"},
    {n: "Apotek Lingkar", lat: -8.615612, lng: 116.098712, a: "Jl. Lingkar Selatan"},
    {n: "Apotek Sayang-Sayang", lat: -8.571231, lng: 116.128712, a: "Jl. Jend. Sudirman"}
];

// 4. Perulangan untuk Menampilkan Nama Fasilitas & Alamat (Poin Identitas)
dataApotek.forEach(function(item) {
    L.marker([item.lat, item.lng], {icon: apotekIcon})
     .addTo(map)
     .bindPopup(
        "<b>Nama Apotek:</b><br>" + item.n + 
        "<br><br><b>Alamat:</b><br>" + item.a
     );
});

// 5. GeoJSON: Garis Merah Sangat Tebal (Batas Wilayah)
fetch('data/mataram.geojson')
    .then(res => res.json())
    .then(data => {
        L.geoJSON(data, {
            style: { color: "red", weight: 10, fillOpacity: 0.1 }
        }).addTo(map);
    });

L.control.scale().addTo(map);
let actualPosition
let standartPosition = {}
let setaesquerda = document.getElementById("setaesquerda")
let setadireita = document.getElementById("setadireita")
let contadorFoto = 0
let newUrl

function success(pos) {
    actualPosition = pos.coords;

    console.log('Sua posição atual é:');
    console.log('Latitude : ' + actualPosition.latitude);
    console.log('Longitude: ' + actualPosition.longitude);
    console.log('Aproximadamente ' + actualPosition.accuracy + ' metros.');
};

function error(err) {
    standartPosition.latitude = 47.542565
    standartPosition.longitude = 12.921156
    standartPosition.accuracy = 750
    console.log('Sua posição atual é:');
    console.log('Latitude : ' + standartPosition.latitude);
    console.log('Longitude: ' + standartPosition.longitude);
    console.log('Aproximadamente ' + standartPosition.accuracy + ' metros.');
    console.warn('ERROR(' + err.code + '): ' + err.message);

};

function constructImageURL(photoObj) {
    return "https://farm" + photoObj.farm +
        ".staticflickr.com/" + photoObj.server +
        "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
}

navigator.geolocation.getCurrentPosition(success, error);
fetch("https://shrouded-mountain-15003.herokuapp.com/https://www.flickr.com/services/rest/?api_key=4db46ebd743a9b2ad1c47323755bb695&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=-25.4284&lon=-49.2733&text=oi")
    .then(responseObject => responseObject.json())
    .then(hydratedBody => {
        newUrl = hydratedBody
        console.log(hydratedBody)
        const imageUrl = constructImageURL(hydratedBody.photos.photo[0]);
        console.log(imageUrl)
        document.getElementById("foto").src = imageUrl


    })

setadireita.addEventListener("click", function () {
    if (contadorFoto < 4) {
        contadorFoto++
        imageUrl = constructImageURL(newUrl.photos.photo[contadorFoto]);
        document.getElementById("foto").src = imageUrl
    }
    else {
        contadorFoto = 0
        imageUrl = constructImageURL(newUrl.photos.photo[contadorFoto]);
        document.getElementById("foto").src = imageUrl
    }
})

setaesquerda.addEventListener("click", function () {
    if (contadorFoto > 0) {
        contadorFoto--
        imageUrl = constructImageURL(newUrl.photos.photo[contadorFoto]);
        document.getElementById("foto").src = imageUrl
    }
    else {
        contadorFoto = 4
        imageUrl = constructImageURL(newUrl.photos.photo[contadorFoto]);
        document.getElementById("foto").src = imageUrl
    }
})
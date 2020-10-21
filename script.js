let actualPosition = {}
let setaesquerda = document.getElementById("setaesquerda")
let setadireita = document.getElementById("setadireita")
let contadorFoto = 0
let newUrl
let submitButton = document.getElementById("submit")
let formText = document.getElementById("form")
let searchedWord = ""

function success(pos) {
    actualPosition = pos.coords;
    console.log(actualPosition.longitude)
    console.log(actualPosition.latitude)
    upadeteLink(actualPosition, searchedWord)

};

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
    actualPosition.latitude = 52.466167
    actualPosition.longitude = -7.694979
    upadeteLink(actualPosition, searchedWord)
};

function constructImageURL(photoObj) {
    return "https://farm" + photoObj.farm +
        ".staticflickr.com/" + photoObj.server +
        "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
}

navigator.geolocation.getCurrentPosition(success, error);


function createNewLink(hydratedBody) {
    newUrl = hydratedBody
    console.log(hydratedBody.photos.photo)
    if (hydratedBody.photos.photo.length === 0) {
        alert("Não existem fotos na sua região")
        let newPosition = {}
        newPosition.latitude = 52.466167
        newPosition.longitude = -7.694979
        searchedWord = ""
        console.log(newPosition)
        return upadeteLink(newPosition, searchedWord)
    }
    const imageUrl = constructImageURL(hydratedBody.photos.photo[0]);
    document.getElementById("foto").src = imageUrl
}




function upadeteLink(actualPosition, searchedWord) {
    console.log(searchedWord)
    fetch(`https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=4db46ebd743a9b2ad1c47323755bb695&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=${actualPosition.latitude}&lon=${actualPosition.longitude}&text=${searchedWord}`)
        .then(responseObject => responseObject.json())
        .then(hydratedBody => {
            createNewLink(hydratedBody, actualPosition)
        })
}

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

submitButton.addEventListener("click", function () {
    searchedWord = formText.value
    upadeteLink(actualPosition, searchedWord)
})
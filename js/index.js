const URI = "https://rickandmortyapi.com/api/character"

const divCard = document.getElementById("cards-container")
const btnSiguiente = document.getElementById("siguiente")
const btnAtras = document.getElementById("atras")

let UrlSiguiente = null
let UrlAtras = null

btnAtras.disabled = true
btnSiguiente.disabled = true

btnSiguiente.addEventListener('click',()=>{
    cargarDatos(UrlSiguiente)
})

btnAtras.addEventListener('click',()=>{
    cargarDatos(UrlAtras)
})

cargarDatos(URI)

function cargarDatos(URL) {
    fetch(URL)
    .then(respuesta => respuesta.json())
    .then(data => {
        console.log(data.info.next)
        const personajes = data.results
        const pagSiguiente = data.info.next
        const pagAtras = data.info.prev
        // console.log(data.info.next)
        imprimirPersonajes(personajes)
        // imprimirPersonajes(pagSiguiente)

        if(pagAtras !=null){
            UrlAtras = pagAtras
            btnAtras.disabled = false
        }else{
            UrlSiguiente = pagSiguiente
            btnSiguiente.disabled = true
        }

        if(pagSiguiente !=null){
            UrlSiguiente = pagSiguiente
            btnSiguiente.disabled = false
        }else{
            UrlSiguiente = pagSiguiente
            btnSiguiente.disabled = true
        }

    })
} 

function imprimirPersonajes(arrayPersonajes) { 
    divCard.innerHTML= ''
    arrayPersonajes.forEach(personaje => {
        let card = document.createElement("div");
        card.className = "card p-0 bg-dark text-light";
        card.style.width = "18rem"
        card.innerHTML = `<img class="card-img-top" src="${personaje.image}" alt="">
        <div class="card-body">
        <p class="card-text"><strong>${personaje.id}</strong> Nombre: ${personaje.name}</p>
        </div>`
    divCard.appendChild(card);
  });
}

// CONSUMO DE API APLICANDO CATCH(PARA CACTURAR ERRORES) AND FINALLY (COMO QUEREMOS QUE SE COMPORTE NUESTRA APP LUEGO DE QUE REALICE EL FETCH)
// fetch(`https://rickandmortyapi.com/api/character`)
// .then(response => response.json())
// .then(datos => {
//     console.log(datos.results[1])

// })
// .catch(error => console.warn(error.message))
// .finally(console.log("finalizo el fetch"))

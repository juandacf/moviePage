import { movies } from "./data/movies.js";


const blockInserter = new Promise( (resolve,reject)=>{
        if (movies){
             resolve (movies);
        } else {    
            reject ('La información no pudo ser encontrada.')
        }
    }
)



const data = blockInserter
.then((data)=> {console.log('data was fetched succesfully') 
    return data})
.catch((error)=> error);

(async () => {
    try {
        const fetchedData = await blockInserter; 
        for(const movie in fetchedData){
            const {titulo:titulo, imagen:imagen, resumen:resumen, id:id } =fetchedData[movie];
            const movieItem =document.createElement('div');
            const movieContainer = document.getElementById("movieContainer");
            movieItem.classList.add('movieItem');
            movieItem.setAttribute("id", `${id}`);
            movieItem.innerHTML = `<h1 class="cardTitle">  ${titulo} </h1>
                                   <img src="${imagen}" class="movieImg">
                                   <p class="movieSummary">${resumen}</p>
                                   <button class="seeMore" id="button${id}"> Ver Detalles </button>
            `;
            movieContainer.appendChild(movieItem); 

            const searchButton = document.querySelector("#inputButton")
            searchButton.onclick = () => {
                const inputBar = document.querySelector("#inputBar");
                const inputValue = inputBar.value
                const loweredInput = inputValue.toLowerCase();
                for (const movie in fetchedData){
                    const {titulo:titulo, id:id} = fetchedData[movie];
                    const loweredTitle = titulo.toLowerCase();
                    if(!loweredTitle.includes(loweredInput)){
                       document.getElementById(`${id}`).style.display = 'none';
                    }
                }
                if (loweredInput===''){
                    location.reload();
                }
                
    }

        }
        for(const movie in fetchedData){
            const {id:id,imagen:imagen, titulo:titulo, descripcion:descripcion, duracion:duracion, genero:genero, fechaLanzamiento:fechaLanzamiento, cast:cast }= fetchedData[movie];
            const seeMoreButton = document.getElementById(`button${id}`);
            seeMoreButton.onclick = ()=>{
                const popUp = document.createElement('div');
                const mainContainer = document.querySelector("#movieContainer")
                popUp.classList.add('popUp');
                popUp.innerHTML =`
        <div class="popUpPart">
            <img src="${imagen}" alt="" class="popUpImage" >
        </div>
        <div class="popUpPart">
        <img src=./images/close.png id="closeButton">
            <h1 class="popUpTitle"> Titulo: ${titulo}</h1>
            <p class="popUpParagraph"> Descripćión: ${descripcion}</p>
            <div class="popUpLowerContent">
                <div class="popUpLCPart">
                    <p class="popUpInfo"><span class="bold">Cast:</span> ${cast}</p>
                </div>
                <div class="popUpLCPart">
                    <p class="popUpInfo"><span class="bold">Duracion:</span> ${duracion}</p>
                    <p class="popUpInfo"><span class="bold">Genero:</span> ${genero}</p>
                    <p class="popUpInfo"><span class="bold">Fecha lanzamiento:</span> ${fechaLanzamiento}</p>
                </div>
            </div>

        </div>
                `;
                popUp.style.display= 'flex';
                mainContainer.appendChild(popUp);
                const closeButton = document.getElementById('closeButton');
                closeButton.onclick = ()=> {
                    document.querySelector(".popUp").style.display = 'none';
                    location.reload();
                }

            }


            }


    } catch (error) {
        console.error( error); 
    } finally {
        return; 
    }
})();



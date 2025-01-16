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
            const {id:id, titulo:titulo, descripcion:descripcion, duracion:duracion, genero:genero, fechaLanzamiento:fechaLanzamiento, cast:cast }= fetchedData[movie];
            const seeMoreButton = document.getElementById(`button${id}`);
            seeMoreButton.onclick = ()=>{
                window.alert(id)
            }
            }

    } catch (error) {
        console.error( error); 
    } finally {
        return; 
    }
})();



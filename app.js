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
            const {titulo:titulo, imagen:imagen, resumen:resumen } =fetchedData[movie];
            const movieItem =document.createElement('div');
            const movieContainer = document.getElementById("movieContainer");
            movieItem.classList.add('movieItem');
            movieItem.innerHTML = `<h1 class="cardTitle">  ${titulo} </h1>
                                   <img src="${imagen}" class="movieImg">
                                   <p class="movieSummary">${resumen}</p>
                                   <button class="seeMore"> Ver Detalles </button>
            `;
            movieContainer.appendChild(movieItem); 

        }
    } catch (error) {
        console.error( error); 
    } finally {
        return; 
    }
})();


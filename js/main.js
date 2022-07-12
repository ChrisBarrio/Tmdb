// Paginacion Peliculas
let pagina = 1
const peliculaBtnAnterior = document.getElementById('btn-previous')
const peliculaBtnSiguiente = document.getElementById('btn-next')

peliculaBtnSiguiente.addEventListener('click', () =>{
    if(pagina < 1000){
        pagina += 1;
        cargarPeliculas();
    }
})

peliculaBtnAnterior.addEventListener('click', () =>{
    if(pagina > 1){
        pagina -= 1;
        cargarPeliculas();
    }
})

// Paginacion Series
let paginaSeries = 1
const seriesBtnAnterior = document.getElementById('series-btn-previous')
const seriesBtnSiguiente = document.getElementById('series-btn-next')

seriesBtnSiguiente.addEventListener('click', () =>{
    if(paginaSeries < 1000){
        paginaSeries += 1;
        cargarSeries();
    }
})

seriesBtnAnterior.addEventListener('click', () =>{
    if(paginaSeries > 1){
        paginaSeries -= 1;
        cargarSeries();
    }
})
// ----- Peliculas ----
const cargarPeliculas = async() => {
    
    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=bdcbf02814ba2fb8f3454c18231184d2&language=es-MX&page=${pagina}`);
        // Si la respuesta es correcta 
        if(respuesta.status === 200){
            const datos = await respuesta.json();
            // console.log(datos.results)

            let peliculas=''
            datos.results.forEach(pelicula => {
                peliculas += 
                `
                <div class="card" >
                    <img src='https://image.tmdb.org/t/p/w500/${pelicula.poster_path}' class="card-img card-img-top" alt=${pelicula.title}>
                    <div class="card-body">
                        <div class='card-body-text'>
                            <h5 class="card-title"><strong>${pelicula.title}</strong></h5>
                            <p class='text-white'>${pelicula.overview}</p>
                            <p class='text-white'><i>${pelicula.release_date}</i></p>
                        </div>
                    </div>
                </div>
                `
            });
            document.getElementById('contenedor-peliculas').innerHTML = peliculas


        } else if(respuesta.status === 401){
            console.log(`Error de tipo ${respuesta.status}. Corroborar la Key de la API`)
        } else if(respuesta.status === 404){
            console.log(`Error de tipo ${respuesta.status}. Pagina no encontrada`)
        } else{
            console.log('Error desconocido')
        }
        
    } catch(error){
        console.log(error)
    }
    

}


// ----- Series ----
const cargarSeries = async() => {
    
    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/tv/popular/?api_key=bdcbf02814ba2fb8f3454c18231184d2&language=es-MX&page=${paginaSeries}`);
        
        // Si la respuesta es correcta 
        if(respuesta.status === 200){
            const datos = await respuesta.json();
            // console.log(datos.results)
            let series=''
            datos.results.forEach(serie => {
                series += 
                `
                <div class="card" >
                <img src='https://image.tmdb.org/t/p/w500/${serie.poster_path}' class="card-img card-img-top" alt=${serie.name}>
                <div class="card-body">
                    <div class='card-body-text'>
                    <h5 class="card-title"><strong>${serie.name}</strong></h5>
                    <p class='text-white'>${serie.overview}</p>
                    <p class='text-white'><i>${serie.first_air_date}</i></p>
                    </div>
                </div>
                </div>
                `
            });
            document.getElementById('contenedor-series').innerHTML = series
            
            
        } else if(respuesta.status === 401){
            console.log(`Error de tipo ${respuesta.status}. Corroborar la Key de la API`)
        } else if(respuesta.status === 404){
            console.log(`Error de tipo ${respuesta.status}. Pagina no encontrada`)
        } else{
            console.log('Error desconocido')
        }
        
    } catch(error){
        console.log(error)
    }
    
    
}


// llamado de funciones
cargarPeliculas()
cargarSeries()



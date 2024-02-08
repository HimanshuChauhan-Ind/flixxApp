const global = {
    currentPage : window.location.pathname
}

// Popular Movies
async function showPopularMovies(){

    const {results} = await getAPIData('movie/popular')
    
    results.forEach((movie)=>{
        const div = document.createElement('div')
        div.classList.add('card')

        div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
               ${
                movie.poster_path? ` <img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
                />`: `
                <img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
                />`
               }
            </a>
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                <small class="text-muted">Release: ${movie.release_date}</small>
                </p>
            </div>
        `;
        document.querySelector('#popular-movies').appendChild(div)
    })

}

// General Fetch Request
async function getAPIData(endpoint){
    const API_KEY = '22c9c1494181a5e60b14cae76fdd037c'
    const API_URL = 'https://api.themoviedb.org/3/'

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`)

    const data = response.json()

    return data
}

// Highlight Current Screen Tab
function highlightTab(){
    const navLinks = document.querySelectorAll('.nav-link')
    navLinks.forEach((link)=>{
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active')
        }
    })
}

//Initialize the App
function init(){
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            showPopularMovies()
            console.log('home')
            break;
        case '/shows.html':
            console.log('Tv Shows')
            break;
        case '/tv-details.html':
            console.log('TV Details')
            break;
        case '/movie-details.html':
            console.log('Movie Details')
            break;
        case '/search.html':
            console.log('Seatch')
    }
    highlightTab()
}

document.addEventListener('DOMContentLoaded',init)

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

// Popular Tv shows
async function showPopularShows(){

    const {results} = await getAPIData('tv/popular')
    
    results.forEach((show)=>{
        const div = document.createElement('div')
        div.classList.add('card')

        div.innerHTML = `
            <a href="tv-details.html?id=${show.id}">
               ${
                show.poster_path? ` <img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"
                />`: `
                <img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${show.name}"
                />`
               }
            </a>
            <div class="card-body">
                <h5 class="card-title">${show.name}</h5>
                <p class="card-text">
                <small class="text-muted">Air Date: ${show.first_air_date}</small>
                </p>
            </div>
        `;
        document.querySelector('#popular-shows').appendChild(div)
    })

}

// Movie Details
async function displayMovieData(){
    const movieId =  window.location.search.split('=')[1]
    const movieData = await getAPIData(`movie/${movieId}`)
    
      // Overlay for background image
    displayBackgroundImage('movie', movieData.backdrop_path); 

    const divTop = document.createElement('div')
    divTop.classList.add('details-top')
    divTop.innerHTML = `
                    <div>
                    <img
                    src="https://image.tmdb.org/t/p/w500${movieData.poster_path}"
                    class="card-img-top"
                    alt="${movieData.original_title}"
                    />
                </div>
                <div>
                    <h2>${movieData.original_title}</h2>
                    <p>
                    <i class="fas fa-star text-primary"></i>
                    ${movieData.vote_average.toFixed(1)} / 10
                    </p>
                    <p class="text-muted">Release Date: ${movieData.release_date}</p>
                    <p>
                    ${movieData.overview}
                    </p>
                    <h5>Genres</h5>
                    <ul class="list-group">
                    ${movieData.genres.map(genre => `<li>${genre.name}</li>`).join('')}
                    </ul>
                    <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
                </div>
    `

    document.getElementById('movie-details').appendChild(divTop)

    const divBot = document.createElement('div')
    divBot.classList.add('details-bottom')
    divBot.innerHTML = `
            <div class="details-bottom">
                <h2>Movie Info</h2>
                    <ul>
                        <li><span class="text-secondary">Budget:</span> $${movieData.budget.toLocaleString()}</li>
                        <li><span class="text-secondary">Revenue:</span> $${movieData.revenue.toLocaleString()}</li>
                        <li><span class="text-secondary">Runtime:</span> ${movieData.runtime} minutes</li>
                        <li><span class="text-secondary">Status:</span> ${movieData.status}</li>
                    </ul>
                <h4>Production Companies</h4>
            <div class="list-group">${movieData.production_companies.map(company=>`${company.name}`).join(', ')}</div>
        </div>
    `
    document.getElementById('movie-details').appendChild(divBot)
}

// Tv Shows Details
async function showShowsData(){
    const showId = window.location.search.split('=')[1]
    const shows = await getAPIData(`tv/${showId}`)
    console.log(showId)
    // Overlay for background image
    displayBackgroundImage('show', shows.backdrop_path); 

    const div1 = document.createElement('div')
    div1.classList.add('details-top')
    div1.innerHTML = `
            
            <div>
            <img
                src="https://image.tmdb.org/t/p/w500${shows.poster_path}"
                class="card-img-top"
                alt="${shows.name}"
            />
            </div>
            <div>
            <h2>${shows.name}</h2>
            <p>
                <i class="fas fa-star text-primary"></i>
                ${shows.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${shows.first_air_date}</p>
            <p>
                ${shows.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
                ${shows.genres.map(genre => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="#" target="_blank" class="btn">Visit Show Homepage</a>
            </div>

    `;
    document.querySelector('#show-details').appendChild(div1)

    const div2 = document.createElement('div')
    div2.classList.add('details-bottom')
    div2.innerHTML = `
        <h2>Show Info</h2>
        <ul>
        <li><span class="text-secondary">Number Of Episodes:</span> ${shows.last_episode_to_air.episode_number}</li>
        <li>
            <span class="text-secondary">Last Episode To Air:</span> 
            ${shows.last_episode_to_air.name}
        </li>
        <li><span class="text-secondary">Status:</span> ${shows.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">${shows.production_companies.map(company=>`${company.name}`).join()}</div>
    `
    document.querySelector('#show-details').appendChild(div2)

}

// General Fetch Request
async function getAPIData(endpoint){
    const API_KEY = '22c9c1494181a5e60b14cae76fdd037c'
    const API_URL = 'https://api.themoviedb.org/3/'

    showSpinner(true)

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`)

    const data = response.json()

    showSpinner(false)

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

// Spinner
function showSpinner(bool){
    const spinner = document.querySelector('.spinner')
    if(bool){
        spinner.classList.add('show')
    }else{
        spinner.classList.remove('show')
    }
}

// Display Backdrop On Details Pages
function displayBackgroundImage(type, backgroundPath) {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';
  
    if (type === 'movie') {
      document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
      document.querySelector('#show-details').appendChild(overlayDiv);
    }
  }

// Movie Slider
async function movieSlider(){
    const { results } = await getAPIData('movie/now_playing')

    
    
    results.forEach((movie)=>{
        const div = document.createElement('div')
        div.classList.add('swiper-slide')

        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        </a>
        <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10
        </h4>
        `

        document.querySelector('.swiper-wrapper').appendChild(div)

        initSwiper()
    })
}

function initSwiper() {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      freeMode: true,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      breakpoints: {
        500: {
          slidesPerView: 2,
        },
        700: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    });
  }

//Initialize the App
function init(){
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            movieSlider()
            showPopularMovies()
            break;
        case '/shows.html':
            showPopularShows()
            break;
        case '/tv-details.html':
            showShowsData()
            break;
        case '/movie-details.html':
           displayMovieData()
            break;
        case '/search.html':
            console.log('Seatch')
    }
    highlightTab()
}

document.addEventListener('DOMContentLoaded',init)

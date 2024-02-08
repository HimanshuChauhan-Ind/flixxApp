const global = {
    currentPage : window.location.pathname
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
        case 'index.html':
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

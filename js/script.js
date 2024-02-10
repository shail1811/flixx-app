const global = {
    currentPage: window.location.pathname,
}

async function displayPopularMovies(){
    const { results } = await fetchAPIData('movie/popular');
    results.forEach(movie => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card">
                <a href="movie-details.html?id=${movie.id}">
                    ${
                        movie.poster_path
                        ? `<img
                        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                        class="card-img-top"
                        alt="${movie.title}"
                        />`
                        : `<img
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
            </div>`;
        document.querySelector('#popular-movies').appendChild(div);
    });
    // console.log(results);    
}

//Fetch data from TMDB API
async function fetchAPIData(endpoint){
    const API_KEY = 'dbea717f0751c906a379e0ba2a3c6890';
    const API_URL = 'https://api.themoviedb.org/3/';

    const response = await fetch(
        `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
    );

    const data = await response.json();

    return data;
}

//Nav-bar on active 
function onActiveLink(){
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active');
        }
    });
}

//Initialize function
function init() {
    switch(global.currentPage){
        case '/':
        case '/index.html':
            displayPopularMovies();
            break;
        case '/shows.html':
            console.log('TV SHOWS');
            break;
        case '/tv-details.html':
            console.log('TV SHOW DETAILS');
            break;
        case '/movie-details.html':
            console.log('MOVIE DETAILS');
            break;
        case '/search.html':
            console.log('SEARCH PAGE');
            break;
    }
    onActiveLink();
}

document.addEventListener('DOMContentLoaded' , init);
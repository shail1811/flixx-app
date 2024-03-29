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
}

async function displayPopularShows(){
    const { results } = await fetchAPIData('tv/popular');
    results.forEach(show => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card">
                <a href="tv-details.html?id=${show.id}">
                        ${
                            show.poster_path
                            ?`<img
                            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                            class="card-img-top"
                            alt="${show.title}"
                            />`
                            :`<img
                            src="images/no-image.jpg"
                            class="card-img-top"
                            alt="${show.title}"
                            />`
                        }        
                </a>
                <div class="card-body">
                    <h5 class="card-title">${show.name}</h5>
                    <p class="card-text">
                    <small class="text-muted">Aired: ${show.first_air_date}</small>
                    </p>
                </div>
            </div>
        `;
        document.querySelector('#popular-shows').appendChild(div);
    }); 
}

async function getMovieDetails(){
    const id = window.location.search.split('=')[1];
    const data = await fetchAPIData(`movie/${id}`);

    displayBackgroundImage('movie' , data.
    backdrop_path);

    const div = document.createElement('div');
    div.innerHTML = `
        <div class="details-top">
            <div>
            ${
                data.poster_path
                ? `<img
                src="https://image.tmdb.org/t/p/w500${data.poster_path}"
                class="card-img-top"
                alt="${data.title}"
                />`
                : `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${data.title}"
                />`
            }
            </div>
            <div>
                <h2>${data.title}</h2>
                <p>
                    <i class="fas fa-star text-primary"></i>
                    ${data.vote_average.toFixed(1)} / 10
                </p>
                <p class="text-muted">Release Date: ${data.release_date}</p>
                <p>${data.overview}</p>
                <h5>Genres</h5>
                <ul class="list-group">
                   ${data.genres.map(genre => `<li>${genre.name}</li>`).join('')}
                </ul>
                <a href="${data.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
            </div>
        </div>
  
        <div class="details-bottom">
            <h2>Movie Info</h2>
            <ul>
                <li><span class="text-secondary">Budget:</span> $${numberWithCommas(data.budget)}</li>
                <li><span class="text-secondary">Revenue:</span> $${numberWithCommas(data.revenue)}</li>
                <li><span class="text-secondary">Runtime:</span> ${data.runtime} minutes</li>
                <li><span class="text-secondary">Status:</span> ${data.status}</li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">    
               ${data.production_companies.map(cmy => `<span>${cmy.name}</span>`).join(',')} 
            </div>
    `;
    document.querySelector('#movie-details').appendChild(div);
}

async function getShowDetails(){
    const id = window.location.search.split('=')[1];
    const data = await fetchAPIData(`tv/${id}`);

    displayBackgroundImage('tv' , data.backdrop_path);

    const div = document.createElement('div');
    div.innerHTML = `
            <div class="details-top">
                <div>
                ${
                    data.poster_path
                    ? `<img
                    src="https://image.tmdb.org/t/p/w500${data.poster_path}"
                    class="card-img-top"
                    alt="${data.name}"
                    />`
                    : `<img
                    src="images/no-image.jpg"
                    class="card-img-top"
                    alt="${data.name}"
                    />`
                }
                </div>
                <div>
                    <h2>${data.name}</h2>
                    <p>
                        <i class="fas fa-star text-primary"></i>
                        ${data.vote_average} / 10
                    </p>
                    <p class="text-muted">Release Date: ${data.first_air_date}</p>
                    <p>${data.overview}</p>
                    <h5>Genres</h5>
                    <ul class="list-group">
                        ${data.genres.map(genre => `<li>${genre.name}</li>`).join('')}
                    </ul>
                    <a href="${data.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
                </div>
            </div>
            <div class="details-bottom">
                <h2>Show Info</h2>
                <ul>
                    <li><span class="text-secondary">Number Of Episodes:</span> ${data.number_of_episodes}</li>
                    <li>
                        <span class="text-secondary">Last Episode To Air:</span> ${data.last_episode_to_air.name}
                    </li>
                    <li><span class="text-secondary">Status:</span> ${data.status}</li>
                </ul>
                <h4>Production Companies</h4>
                <div class="list-group">${data.production_companies.map(cmy => `<span>${cmy.name}</span>`).join(',')}</div>
            </div>
`;
    document.querySelector('#show-details').appendChild(div);
}

function displayBackgroundImage(type , path){
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${path})`;
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

    if(type === 'movie'){
        document.querySelector('#movie-details').appendChild(overlayDiv);
    } else{
        document.querySelector('#show-details').appendChild(overlayDiv);
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

//Fetch data from TMDB API
async function fetchAPIData(endpoint){
    // THE API KEY SHOULD BE SAVED IN THE DATABASE AND CALLED IT ON SERVER
    // This is just for practice purpose
    const API_KEY = 'dbea717f0751c906a379e0ba2a3c6890';
    const API_URL = 'https://api.themoviedb.org/3/';

    showSpinner();

    const response = await fetch(
        `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
        );

    const data = await response.json();

    hideSpinner();

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
            displayPopularShows();
            break;
        case '/tv-details.html':
            getShowDetails();
            break;
        case '/movie-details.html':
            getMovieDetails();
            break;
        case '/search.html':
            console.log('SEARCH PAGE');
            break;
    }
    onActiveLink();
}

document.addEventListener('DOMContentLoaded' , init);
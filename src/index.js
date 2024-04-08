//write your code here
// Define the URL of the API endpoint
let url = 'https://api.npoint.io/f8d1be198a18712d3f29/films/';
const listHolder = document.getElementById('films');

document.addEventListener('DOMContentLoaded',() => {
    //Remove the placeholder list item
    document.querySelector('.film.item').remove();
    fetchMovies(url);
 });

// Function to fetch movies data from the API
function fetchMovies(url) {
    fetch(url)
        .then(response => {
            if (!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(movies => {
            movies.forEach(movie => {
                displayMovie(movie);
            });
        })
        .catch(error => {
            console.error('Error fetching movies :', error);
        })
}

// Function to display individual movie titles in the list
function displayMovie(movie) {
    const li = document.createElement('li');
    li.style.cursor = "pointer";
    li.textContent = movie.title.toUpperCase();
    listHolder.appendChild(li);
    addClickEvent(li , movie.id); // Pass the movie ID to addClickEvent
}

// Function to handle click events on movie titles
function addClickEvent(li,movieId) {
    li.addEventListener('click', () => {
        fetch(`${url}/${movieId}`)
            .then(res =>{
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(movie => {
                document.getElementById('buy-ticket').textContent = 'Buy Ticket';
                setUpMovieDetails(movie);
            })
            .catch(error => {('Error fetching movie details:', error);
             });

                });
                 }
// Function to display movie details
function setUpMovieDetails(childMovie) {
    const preview = document.getElementById('poster');
    preview.src = childMovie.poster;

    document.getElementById('title').textContent = childMovie.title;
    document.getElementById('runtime').textContent = `${childMovie.runtime} minutes`;
    document.getElementById('film-info').textContent = childMovie.description;
    document.getElementById('showtime').textContent = childMovie.showtime;
    document.getElementById('ticket-num').textContent = childMovie.capacity - childMovie.tickets_sold;
}

// Add event listener to the 'Buy Ticket' button
const btn = document.getElementById('buy-ticket');
btn.addEventListener('click', function(e) {
    let remTickets = parseInt(document.querySelector('#ticket-num').textContent,10);
    e.preventDefault();
    if (remTickets > 0) {
        document.querySelector('#ticket-num').textContent = remTickets -1;
    }else {
        btn.textContent = 'Sold Out';
    }
});



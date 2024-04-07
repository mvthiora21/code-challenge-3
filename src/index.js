//write your code here
// Define the URL of the API endpoint
let url = 'https://api.npoint.io/f8d1be198a18712d3f29/films/';

// Function to fetch movies data from the API
function fetchMovies(url) {
    fetch(url)
        .then(response => response.json())
        .then(movies => {
            movies.forEach(movie => {
                displayMovie(movie);
            });
        });
}

// Function to display movie titles in the list
function displayMovie(movie) {
    const listHolder = document.getElementById('films');
    const li = document.createElement('li');
    li.style.cursor = "pointer";
    li.textContent = movie.title.toUpperCase();
    listHolder.appendChild(li);
    addClickEvent(li); // Pass the created list item to addClickEvent function
}

// Function to add click event listener to movie list items
function addClickEvent(li) {
    li.addEventListener('click', () => {
        // Fetch movie details using the specified URL and movie title
        fetch(`${url}/${li.textContent.toLowerCase().replace(/\s+/g, '-')}`)
            .then(res => res.json())
            .then(movie => {
                // Update movie details on the page
                document.getElementById('buy-ticket').textContent = 'Buy Ticket';
                setUpMovieDetails(movie);
            });
    });
}

// Function to set up movie details display
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
document.getElementById('buy-ticket').addEventListener('click', function(e) {
    let remTickets = document.querySelector('#ticket-num').textContent;
    e.preventDefault();
    if (remTickets > 0) {
        document.querySelector('#ticket-num').textContent = remTickets - 1;
    } else if (parseInt(remTickets, 10) === 0) {
        this.textContent = 'Sold Out'; // 'this' refers to the button element
    }
});

// Execute fetchMovies function when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Remove the placeholder list item
    document.querySelector('.film.item').remove();
    // Fetch movies data
    fetchMovies(url);
});

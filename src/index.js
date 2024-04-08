// Define the URL of the API endpoint
const url = 'https://api.npoint.io/f8d1be198a18712d3f29/films/';

// fetch movies after loading page
document.addEventListener('DOMContentLoaded', () => {
    // Remove a placeholder list item
    document.querySelector('.film.item').remove();
    // Fetch movies from the API
    fetchMovies();
});

// Function to fetch movies data from the API
async function fetchMovies() {
    try {
        // Fetch data from the API
        const response = await fetch(url);
        // Check if response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        // Convert response data to JSON
        const movies = await response.json();
        // Display each movie
        movies.forEach(movie => displayMovie(movie));
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Function to display individual movie titles in the list
function displayMovie(movie) {
    // Create a new list item
    const li = document.createElement('li');
    // Set the text of the list item to the movie title in uppercase
    li.textContent = movie.title.toUpperCase();
    // Add a click event listener to the list item
    li.addEventListener('click', async () => {
        try {
            // Fetch details of the clicked movie
            const response = await fetch(`${url}/${movie.id}`);
            // Check if response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch movie details');
            }
            // Convert response data to JSON
            const childMovie = await response.json();
            // Update movie details on the page
            updateMovieDetails(childMovie);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    });
    // Add the list item to the films list
    document.getElementById('films').appendChild(li);
}

// Function to update movie details on the page
function updateMovieDetails(movie) {
    // Update poster image source
    document.getElementById('poster').src = movie.poster;
    // Update movie title
    document.getElementById('title').textContent = movie.title;
    // Update movie runtime
    document.getElementById('runtime').textContent = `${movie.runtime} minutes`;
    // Update movie description
    document.getElementById('film-info').textContent = movie.description;
    // Update movie showtime
    document.getElementById('showtime').textContent = movie.showtime;
    // Update remaining ticket count
    const remainingTickets = movie.capacity - movie.tickets_sold;
    document.getElementById('ticket-num').textContent = remainingTickets;
}

// Buy Ticket button event listener
document.getElementById('buy-ticket').addEventListener('click', () => {
    // Get the remaining ticket count
    const ticketNum = document.getElementById('ticket-num');
    let remainingTickets = parseInt(ticketNum.textContent);
    // If there are remaining tickets, decrement the count
    if (remainingTickets > 0) {
        ticketNum.textContent = remainingTickets - 1;
    } else {
        // If no tickets left, show "Sold Out" message
        document.getElementById('buy-ticket').textContent = 'Sold Out';
    }
});

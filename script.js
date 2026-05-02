// Load local quotes (from data/quotes.js)
// quotes array is loaded globally from data/quotes.js

// DOM Elements
const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');
const quoteCategory = document.querySelector('.quote-category');
const newQuoteBtn = document.getElementById('new-quote-btn');
const copyBtn = document.getElementById('copy-btn');
const shareBtn = document.getElementById('share-btn');
const favoriteBtn = document.getElementById('favorite-btn');
const darkModeBtn = document.getElementById('dark-mode-btn');
const spinner = document.querySelector('.spinner');
const favoritesList = document.querySelector('.favorites-list');
const favoritesContainer = document.getElementById('favorites-container');

// State
let currentQuote = null;
let previousQuoteIndex = -1;
let favorites = JSON.parse(localStorage.getItem('quoteFavorites')) || [];
let isDarkMode = localStorage.getItem('darkMode') === 'true';
let useApi = true; // Toggle between API and local quotes

// Initialize
function init() {
  // Load dark mode preference
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeBtn.innerHTML = '☀️ Light Mode';
  }

  // Load favorites
  updateFavoritesList();

  // Display first quote
  getNewQuote();

  // Event Listeners
  newQuoteBtn.addEventListener('click', getNewQuote);
  copyBtn.addEventListener('click', copyQuote);
  shareBtn.addEventListener('click', shareQuote);
  favoriteBtn.addEventListener('click', toggleFavorite);
  darkModeBtn.addEventListener('click', toggleDarkMode);
}

// Get random quote (avoid repeating previous)
function getRandomLocalQuote() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (randomIndex === previousQuoteIndex && quotes.length > 1);
  
  previousQuoteIndex = randomIndex;
  return quotes[randomIndex];
}

// Fetch quote from Quotable API
async function fetchQuoteFromApi() {
  try {
    showLoading();
    const response = await fetch('https://api.quotable.io/random');
    if (!response.ok) throw new Error('API request failed');
    const data = await response.json();
    return {
      text: data.content,
      author: data.author,
      category: data.tags?.[0] || 'General'
    };
  } catch (error) {
    console.error('API Error:', error);
    return getRandomLocalQuote(); // Fallback to local
  } finally {
    hideLoading();
  }
}

// Get new quote (API or local)
async function getNewQuote() {
  let newQuote;
  
  if (useApi) {
    newQuote = await fetchQuoteFromApi();
  } else {
    newQuote = getRandomLocalQuote();
  }
  
  displayQuote(newQuote);
}

// Display quote with animation
function displayQuote(quote) {
  // Fade out
  quoteText.classList.add('fade-out');
  quoteAuthor.classList.add('fade-out');
  
  setTimeout(() => {
    currentQuote = quote;
    
    // Update content
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `— ${quote.author}`;
    quoteCategory.textContent = quote.category || 'General';
    
    // Update favorite button state
    const isFavorited = favorites.some(fav => 
      fav.text === quote.text && fav.author === quote.author
    );
    favoriteBtn.classList.toggle('favorited', isFavorited);
    favoriteBtn.innerHTML = isFavorited ? '❤️ Unfavorite' : '🤍 Favorite';
    
    // Fade in
    quoteText.classList.remove('fade-out');
    quoteAuthor.classList.remove('fade-out');
  }, 300);
}

// Show/hide loading spinner
function showLoading() {
  spinner.style.display = 'block';
  quoteText.style.opacity = '0.5';
}

function hideLoading() {
  spinner.style.display = 'none';
  quoteText.style.opacity = '1';
}

// Copy quote to clipboard
function copyQuote() {
  if (!currentQuote) return;
  
  const textToCopy = `"${currentQuote.text}" — ${currentQuote.author}`;
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = '✅ Copied!';
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
      }, 2000);
    })
    .catch(err => {
      console.error('Copy failed:', err);
      alert('Failed to copy quote. Please try again.');
    });
}

// Share quote on Twitter
function shareQuote() {
  if (!currentQuote) return;
  
  const text = encodeURIComponent(`"${currentQuote.text}" — ${currentQuote.author}`);
  const url = `https://twitter.com/intent/tweet?text=${text}`;
  window.open(url, '_blank');
}

// Toggle favorite status
function toggleFavorite() {
  if (!currentQuote) return;
  
  const index = favorites.findIndex(fav => 
    fav.text === currentQuote.text && fav.author === currentQuote.author
  );
  
  if (index > -1) {
    // Remove from favorites
    favorites.splice(index, 1);
  } else {
    // Add to favorites
    favorites.push({
      text: currentQuote.text,
      author: currentQuote.author,
      category: currentQuote.category
    });
  }
  
  // Save to localStorage
  localStorage.setItem('quoteFavorites', JSON.stringify(favorites));
  
  // Update UI
  favoriteBtn.classList.toggle('favorited');
  favoriteBtn.innerHTML = index > -1 ? '🤍 Favorite' : '❤️ Unfavorite';
  
  updateFavoritesList();
}

// Update favorites list
function updateFavoritesList() {
  if (favorites.length === 0) {
    favoritesContainer.innerHTML = '<p>No favorites yet. Click the ❤️ button to add some!</p>';
    return;
  }
  
  favoritesContainer.innerHTML = favorites.map((fav, index) => `
    <div class="favorite-item">
      <div>
        <p>"${fav.text}"</p>
        <small>— ${fav.author} (${fav.category})</small>
      </div>
      <button onclick="removeFavorite(${index})">🗑️</button>
    </div>
  `).join('');
}

// Remove favorite (global function for inline onclick)
window.removeFavorite = function(index) {
  favorites.splice(index, 1);
  localStorage.setItem('quoteFavorites', JSON.stringify(favorites));
  updateFavoritesList();
  
  // Update favorite button if current quote is removed
  if (currentQuote && favorites.every(fav => 
    fav.text !== currentQuote.text || fav.author !== currentQuote.author
  )) {
    favoriteBtn.classList.remove('favorited');
    favoriteBtn.innerHTML = '🤍 Favorite';
  }
};

// Toggle dark mode
function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  darkModeBtn.innerHTML = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

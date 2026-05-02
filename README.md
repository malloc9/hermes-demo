# Hermes Demo - Random Quote Generator

A modern, interactive Random Quote Generator built with vanilla HTML, CSS, and JavaScript. This project was implemented as part of the Hermes Agent demo repository.

## Features

✅ **Phase 1 - Basic Version**
- Display random quotes with author attribution
- Local quotes array (12 curated quotes)
- "New Quote" button to generate random quotes
- Avoids repeating the same quote consecutively

✅ **Phase 2 - Better UI**
- Smooth fade in/out animations for quote transitions
- Fully responsive design (mobile, tablet, desktop)
- Gradient background with glassmorphism quote card
- Hover effects and interactive button animations
- Google Fonts (Poppins) for clean typography

✅ **Phase 3 - Advanced Features**
- **API Integration**: Fetches quotes from [Quotable API](https://quotable.io) with local fallback
- **Copy to Clipboard**: One-click copy of quotes to share anywhere
- **Twitter Share**: Instantly share quotes on Twitter/X
- **Favorites System**: Save your favorite quotes with localStorage persistence
- **Dark/Light Mode**: Toggle between themes, preference saved in localStorage
- **Category Filtering**: Quotes organized by categories (Motivation, Life, Success, Programming)

## Technologies Used

- HTML5
- CSS3 (Flexbox, Gradients, Glassmorphism, Animations)
- Vanilla JavaScript (ES6+)
- [Quotable API](https://quotable.io) for external quotes
- Google Fonts (Poppins)
- localStorage for data persistence

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/malloc9/hermes-demo.git
   cd hermes-demo
   ```

2. Open `index.html` in your browser, or use a local server:
   ```bash
   npx serve .
   ```

3. Start generating quotes!

## GitHub Pages

This project is deployed live at:  
🔗 [https://malloc9.github.io/hermes-demo/](https://malloc9.github.io/hermes-demo/)

## Folder Structure

```
hermes-demo/
├── index.html          # Main HTML file
├── style.css           # All styles and animations
├── script.js           # JavaScript logic and API integration
├── data/
│   └── quotes.js      # Local quotes array
├── README.md          # This file
└── hello.py           # Original demo Python file
```

## Development Phases

### Phase 1: Basic Version
- DOM manipulation
- Arrays and objects
- Event listeners
- Basic styling

### Phase 2: Better UI
- CSS transitions and animations
- Flexbox layout
- Responsive design principles
- UI/UX design

### Phase 3: Advanced Features
- API integration with fetch()
- Clipboard API for copy functionality
- Twitter Web Intent API for sharing
- localStorage for favorites and preferences
- Dark mode toggle with state persistence

## Credits

Built with ❤️ using [Hermes Agent](https://github.com/NousResearch/hermes-agent) and Claude Code CLI.

## License

MIT License - feel free to use this project for learning or as a template!

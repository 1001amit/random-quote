document.addEventListener("DOMContentLoaded", function() {
    const quoteText = document.getElementById('quote');
    const authorText = document.getElementById('author');
    const newQuoteButton = document.getElementById('new-quote');
    
    async function getQuotes() {
        try {
            const response = await fetch('quotes.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const quotes = await response.json();
            return quotes;
        } catch (error) {
            console.error('Failed to fetch quotes:', error);
            quoteText.textContent = 'Failed to load quotes. Please try again later.';
            authorText.textContent = '';
        }
    }

    function getRandomQuote(quotes) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    }

    async function displayRandomQuote() {
        const quotes = await getQuotes();
        if (quotes) {
            const randomQuote = getRandomQuote(quotes);
            quoteText.textContent = `"${randomQuote.quote}"`;
            authorText.textContent = `- ${randomQuote.author}`;
        }
    }

    newQuoteButton.addEventListener('click', displayRandomQuote);
});


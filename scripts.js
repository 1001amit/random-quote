document.addEventListener("DOMContentLoaded", function() {
    const quoteText = document.getElementById('quote');
    const authorText = document.getElementById('author');
    const newQuoteButton = document.getElementById('new-quote');
    const shareQuoteButton = document.getElementById('share-quote');
    
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

    function shareQuote() {
        const quote = quoteText.textContent;
        const author = authorText.textContent;
        const tweetText = `${quote} ${author}`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        window.open(twitterUrl, '_blank');
    }

    newQuoteButton.addEventListener('click', displayRandomQuote);
    shareQuoteButton.addEventListener('click', shareQuote);
});

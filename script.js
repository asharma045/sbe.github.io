const changingWord = document.getElementById('changing-word');
const wordsWithEmojis = [
    { text: "Fermenting", emoji: "🧪" },
    { text: "Innovating", emoji: "🔬" }, // Updated emoji
    { text: "Creating", emoji: "🔭" },
    { text: "Engineering", emoji: "👩‍🔬👨‍🔬" }
];

let currentWordIndex = 0;

function typeWord(word) {
    let currentText = "";
    const targetWord = `${word.text}${word.emoji}`;

    return new Promise((resolve) => {
        const typing = setInterval(() => {
            if (currentText.length < targetWord.length) {
                currentText += targetWord.charAt(currentText.length);
                changingWord.textContent = currentText;
            } else {
                clearInterval(typing);
                resolve();
            }
        }, 150); // Typing speed
    });
}

function deleteWord(word) {
    let currentText = `${word.text}${word.emoji}`;
    
    return new Promise((resolve) => {
        const deleting = setInterval(() => {
            if (currentText.length > 0) {
                currentText = currentText.slice(0, -1);
                changingWord.textContent = currentText;
            } else {
                clearInterval(deleting);
                resolve();
            }
        }, 75); // Deleting speed
    });
}

async function cycleWords() {
    while (true) {
        const currentWord = wordsWithEmojis[currentWordIndex];
        await typeWord(currentWord);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Pause before deleting
        await deleteWord(currentWord);

        currentWordIndex = (currentWordIndex + 1) % wordsWithEmojis.length; // Cycle through words
    }
}

// Function to update the body background gradient based on scroll position
window.addEventListener('scroll', function() {
    // Get the current scroll position
    const scrollTop = window.scrollY;
    // Get the total height of the document
    const documentHeight = document.body.scrollHeight - window.innerHeight;

    // Calculate the scroll percentage (0 to 1)
    const scrollPercentage = scrollTop / documentHeight;

    // Define colors for the gradient
    const startColor = { r: 247, g: 247, b: 213 }; // #f7f7d5
    const middleColor = { r: 185, g: 209, b: 226 }; // #b9d1e2
    const endColor = { r: 0, g: 123, b: 255, a: 0.7 }; // rgba(0, 123, 255, 0.7)

    // Interpolate colors based on scroll percentage
    const r = Math.round(startColor.r + (middleColor.r - startColor.r) * scrollPercentage + (endColor.r - middleColor.r) * scrollPercentage);
    const g = Math.round(startColor.g + (middleColor.g - startColor.g) * scrollPercentage + (endColor.g - middleColor.g) * scrollPercentage);
    const b = Math.round(startColor.b + (middleColor.b - startColor.b) * scrollPercentage + (endColor.b - middleColor.b) * scrollPercentage);
    const a = scrollPercentage < 1 ? 1 : endColor.a; // Maintain opacity until end

    // Set the new background
    document.body.style.background = `linear-gradient(to bottom, rgba(${startColor.r}, ${startColor.g}, ${startColor.b}, 1), rgba(${r}, ${g}, ${b}, ${a}))`;
});

// Start cycling through words
cycleWords();

document.addEventListener('DOMContentLoaded', function() {
    // Game variables
    const gameArea = document.getElementById('game-area');
    const startButton = document.getElementById('start-game');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const highScoresList = document.getElementById('high-scores-list');
      // i-Wall variables
    const iParagraph = document.querySelector('.i-paragraph');
    
    // Interactive "i" wall
    if (iParagraph) {
        // Ensure we can access text nodes and elements properly
        const textNodes = [];
        const walk = document.createTreeWalker(iParagraph, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walk.nextNode()) {
            textNodes.push(node);
        }
        
        // Animate random "i"s in the paragraph
        setInterval(() => {
            // Pick a random text node
            if (textNodes.length > 0) {
                const randomNodeIndex = Math.floor(Math.random() * textNodes.length);
                const textNode = textNodes[randomNodeIndex];
                const text = textNode.nodeValue;
                
                // Find positions of all "i"s in this text node
                const positions = [];
                for (let i = 0; i < text.length; i++) {
                    if (text[i] === 'i') {
                        positions.push(i);
                    }
                }
                
                if (positions.length > 0) {
                    // Pick a random "i" position
                    const randomPos = positions[Math.floor(Math.random() * positions.length)];
                    
                    // Create a temporary span to highlight this "i"
                    const tempSpan = document.createElement('span');
                    const hue = Math.floor(Math.random() * 60) + 240; // Blue to purple range
                    tempSpan.style.color = `hsl(${hue}, 80%, 50%)`;
                    tempSpan.style.textShadow = `0 0 3px hsl(${hue}, 80%, 70%)`;
                    tempSpan.textContent = 'i';
                    
                    // Split the text node and insert our styled span
                    const before = text.substring(0, randomPos);
                    const after = text.substring(randomPos + 1);
                    
                    const beforeNode = document.createTextNode(before);
                    const afterNode = document.createTextNode(after);
                    
                    const parent = textNode.parentNode;
                    parent.insertBefore(beforeNode, textNode);
                    parent.insertBefore(tempSpan, textNode);
                    parent.insertBefore(afterNode, textNode);
                    parent.removeChild(textNode);
                    
                    // Remove the highlight after a short delay
                    setTimeout(() => {
                        if (tempSpan.parentNode) {
                            const newTextNode = document.createTextNode(before + 'i' + after);
                            parent.insertBefore(newTextNode, beforeNode);
                            parent.removeChild(beforeNode);
                            parent.removeChild(tempSpan);
                            parent.removeChild(afterNode);
                            
                            // Update our text nodes array
                            textNodes.splice(randomNodeIndex, 1, newTextNode);
                        }
                    }, 500);
                }
            }
        }, 200);
        
        // Subtle highlight for the rickroll link
        const rickrollLink = iParagraph.querySelector('.hidden-link');
        if (rickrollLink) {
            rickrollLink.addEventListener('mouseover', function() {
                this.style.color = '#f72585';
                this.style.textShadow = '0 0 5px rgba(247, 37, 133, 0.5)';
            });
            
            rickrollLink.addEventListener('mouseout', function() {
                this.style.color = '';
                this.style.textShadow = '';
            });
        }
    }
    
    let gameActive = false;
    let score = 0;
    let timeLeft = 30;
    let gameInterval;
    let spawnInterval;
    let highScores = [
        { name: "Joueur 1", score: 42 },
        { name: "Joueur 2", score: 38 },
        { name: "Joueur 3", score: 35 }
    ];
    
    // Animation for the letter i in the hero section
    const iAnimation = document.querySelector('.i-animation');
    setInterval(() => {
        iAnimation.style.textShadow = `0 0 ${Math.random() * 20 + 10}px rgba(74, 42, 234, ${Math.random() * 0.3 + 0.2})`;
    }, 500);
    
    // Start the game when the start button is clicked
    startButton.addEventListener('click', startGame);
    
    function startGame() {
        // Reset game state
        gameArea.innerHTML = '';
        score = 0;
        timeLeft = 30;
        gameActive = true;
        
        // Update displays
        scoreDisplay.textContent = score;
        timerDisplay.textContent = timeLeft;
        
        // Start spawning letter i's
        spawnInterval = setInterval(spawnLetterI, 800);
        
        // Start the game timer
        gameInterval = setInterval(updateTimer, 1000);
    }
    
    function updateTimer() {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }
    
    function spawnLetterI() {
        if (!gameActive) return;
        
        // Create a new letter i element
        const letterI = document.createElement('div');
        letterI.classList.add('flying-i');
        letterI.textContent = 'i';
        
        // Random position within the game area
        const maxX = gameArea.clientWidth - 40;
        const maxY = gameArea.clientHeight - 40;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        // Set position and style
        letterI.style.left = `${randomX}px`;
        letterI.style.top = `${randomY}px`;
        
        // Random color variation
        const hue = Math.floor(Math.random() * 60) + 240; // Blue to purple range
        letterI.style.color = `hsl(${hue}, 80%, 50%)`;
        
        // Random size variation
        const size = Math.floor(Math.random() * 20) + 20;
        letterI.style.fontSize = `${size}px`;
        
        // Add click event to collect the letter i
        letterI.addEventListener('click', function() {
            if (gameActive) {
                collectLetterI(letterI, size);
            }
        });
        
        // Add to game area
        gameArea.appendChild(letterI);
        
        // Set automatic removal after a delay
        setTimeout(() => {
            if (letterI.parentNode === gameArea) {
                gameArea.removeChild(letterI);
            }
        }, 2000);
    }
    
    function collectLetterI(element, size) {
        // Remove the letter i from the game area
        gameArea.removeChild(element);
        
        // Award points based on size (smaller i's are worth more)
        const points = Math.max(1, Math.floor(40 / size));
        score += points;
        
        // Update score display
        scoreDisplay.textContent = score;
        
        // Visual feedback
        const pointsIndicator = document.createElement('div');
        pointsIndicator.textContent = `+${points}`;
        pointsIndicator.style.position = 'absolute';
        pointsIndicator.style.left = element.style.left;
        pointsIndicator.style.top = element.style.top;
        pointsIndicator.style.color = '#4a2aea';
        pointsIndicator.style.fontWeight = 'bold';
        pointsIndicator.style.zIndex = '10';
        
        gameArea.appendChild(pointsIndicator);
        
        // Animate the points indicator
        let opacity = 1;
        let posY = parseInt(pointsIndicator.style.top);
        
        const fadeInterval = setInterval(() => {
            opacity -= 0.05;
            posY -= 2;
            
            pointsIndicator.style.opacity = opacity;
            pointsIndicator.style.top = `${posY}px`;
            
            if (opacity <= 0) {
                clearInterval(fadeInterval);
                gameArea.removeChild(pointsIndicator);
            }
        }, 30);
    }
      function endGame() {
        gameActive = false;
        clearInterval(gameInterval);
        clearInterval(spawnInterval);
        
        // Check if the score is a high score
        const isHighScore = checkHighScore(score);
        
        // Display game over message
        gameArea.innerHTML = '';
        const gameOverMsg = document.createElement('div');
        gameOverMsg.style.position = 'absolute';
        gameOverMsg.style.top = '50%';
        gameOverMsg.style.left = '50%';
        gameOverMsg.style.transform = 'translate(-50%, -50%)';
        gameOverMsg.style.textAlign = 'center';
        
        if (isHighScore) {
            gameOverMsg.innerHTML = `
                <h2>Nouveau Record : ${score} !</h2>
                <p>Félicitations ! Vous êtes incroyable !</p>
                <button id="play-again" style="margin-top: 20px; padding: 10px 20px; background-color: #4a2aea; color: white; border: none; border-radius: 30px; cursor: pointer;">Rejouer</button>
            `;
        } else {
            gameOverMsg.innerHTML = `
                <h2>Partie Terminée</h2>
                <p>Votre score : ${score}</p>
                <button id="play-again" style="margin-top: 20px; padding: 10px 20px; background-color: #4a2aea; color: white; border: none; border-radius: 30px; cursor: pointer;">Rejouer</button>
            `;
        }
        
        gameArea.appendChild(gameOverMsg);
        
        // Add event listener to play again button
        document.getElementById('play-again').addEventListener('click', startGame);
    }
      function checkHighScore(newScore) {
        // Check if the new score is higher than any existing high scores
        if (newScore > highScores[highScores.length - 1].score) {
            // Add new high score
            const playerName = prompt('Félicitations ! Vous avez obtenu un meilleur score. Entrez votre nom :') || 'Anonyme';
            
            highScores.push({ name: playerName, score: newScore });
            
            // Sort high scores in descending order
            highScores.sort((a, b) => b.score - a.score);
            
            // Keep only the top 5 scores
            if (highScores.length > 5) {
                highScores.pop();
            }
            
            // Update high scores display
            updateHighScoresDisplay();
            
            return true;
        }
        
        return false;
    }
    
    function updateHighScoresDisplay() {
        // Clear existing list
        highScoresList.innerHTML = '';
        
        // Add each high score to the list
        highScores.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = `${entry.name}: ${entry.score}`;
            highScoresList.appendChild(li);
        });
    }
    
    // Initialize the high scores display
    updateHighScoresDisplay();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
});

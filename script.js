document.addEventListener('DOMContentLoaded', function() {    // Game variables
    const gameArea = document.getElementById('game-area');
    const startButton = document.getElementById('start-game');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const highScoresList = document.getElementById('high-scores-list');
    
    // Konami code variables
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiCodePosition = 0;
    let konamiCodeActivated = false;
    
    // Listen for keyboard input for Konami code
    document.addEventListener('keydown', function(e) {
        // Get the key pressed
        const key = e.key.toLowerCase();
        
        // Check if it matches the expected key in the Konami code sequence
        const expectedKey = konamiCode[konamiCodePosition].toLowerCase();
        
        if (key === expectedKey) {
            // Move to the next position in the sequence
            konamiCodePosition++;
            
            // If the entire sequence is entered correctly
            if (konamiCodePosition === konamiCode.length) {
                activateKonamiCode();
                konamiCodePosition = 0; // Reset position
            }
        } else {
            // Incorrect key, reset the position
            konamiCodePosition = 0;
        }
    });
    
    function activateKonamiCode() {
        if (!konamiCodeActivated) {
            konamiCodeActivated = true;
            
            // Create a notification to show the cheat code was activated
            const notification = document.createElement('div');
            notification.textContent = '✨ Mode Super i Activé! ✨';
            notification.style.position = 'fixed';
            notification.style.top = '20px';
            notification.style.left = '50%';
            notification.style.transform = 'translateX(-50%)';
            notification.style.padding = '10px 20px';
            notification.style.backgroundColor = 'rgba(74, 42, 234, 0.9)';
            notification.style.color = 'white';
            notification.style.borderRadius = '20px';
            notification.style.fontWeight = 'bold';
            notification.style.zIndex = '1000';
            notification.style.boxShadow = '0 0 10px rgba(74, 42, 234, 0.5)';
            
            document.body.appendChild(notification);
            
            // Remove the notification after a few seconds
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 3000);
            
            // Apply effects to the game elements
            document.querySelector('.game-section').style.background = 'linear-gradient(135deg, #8a2be2 0%, #4b0082 100%)';
            document.querySelector('.game-container').style.boxShadow = '0 0 30px rgba(138, 43, 226, 0.7)';
            
            // If game is active, spawn a bunch of special "i"s
            if (gameActive) {
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => {
                        spawnSpecialLetterI();
                    }, i * 200);
                }
            }
        }
    }
    
    function spawnSpecialLetterI() {
        if (!gameActive) return;
        
        // Create a special letter i element
        const specialI = document.createElement('div');
        specialI.classList.add('flying-i', 'special-i');
        specialI.textContent = 'i';
        
        // Random position within the game area
        const maxX = gameArea.clientWidth - 40;
        const maxY = gameArea.clientHeight - 40;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        // Set position and style
        specialI.style.left = `${randomX}px`;
        specialI.style.top = `${randomY}px`;
        
        // Golden special "i"
        specialI.style.color = '#FFD700';
        specialI.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.8)';
        
        // Larger size
        specialI.style.fontSize = '40px';
        specialI.style.fontWeight = 'bold';
        
        // Add animation
        specialI.style.animation = 'pulse 1s infinite alternate';
        
        // Add click event to collect the special letter i
        specialI.addEventListener('click', function() {
            if (gameActive) {
                collectSpecialLetterI(specialI);
            }
        });
        
        // Add to game area
        gameArea.appendChild(specialI);
        
        // Set automatic removal after a delay
        setTimeout(() => {
            if (specialI.parentNode === gameArea) {
                gameArea.removeChild(specialI);
            }
        }, 3000);
    }
    
    function collectSpecialLetterI(element) {
        // Remove the special letter i from the game area
        gameArea.removeChild(element);
        
        // Award bonus points for special "i"s
        const bonusPoints = 20;
        score += bonusPoints;
        
        // Update score display
        scoreDisplay.textContent = score;
        
        // Visual feedback
        const pointsIndicator = document.createElement('div');
        pointsIndicator.textContent = `+${bonusPoints}`;
        pointsIndicator.style.position = 'absolute';
        pointsIndicator.style.left = element.style.left;
        pointsIndicator.style.top = element.style.top;
        pointsIndicator.style.color = '#FFD700';
        pointsIndicator.style.fontWeight = 'bold';
        pointsIndicator.style.fontSize = '24px';
        pointsIndicator.style.zIndex = '10';
        pointsIndicator.style.textShadow = '0 0 5px rgba(255, 215, 0, 0.5)';
        
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
        
        // Reset Konami code state
        konamiCodeActivated = false;
        konamiCodePosition = 0;
        
        // Restore default styling if it was changed by Konami code
        document.querySelector('.game-section').style.background = '';
        document.querySelector('.game-container').style.boxShadow = '';
        
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

    // i-Clicker Game Variables
    const mainIButton = document.getElementById('main-i-button');
    const iPointsDisplay = document.getElementById('i-points');
    const iPerSecondDisplay = document.getElementById('i-per-second');
    
    // Upgrade elements
    const cursorUpgrade = document.getElementById('upgrade-cursor');
    const autoUpgrade = document.getElementById('upgrade-auto');
    const multiplierUpgrade = document.getElementById('upgrade-multiplier');
    
    // Upgrade cost and level displays
    const cursorCostDisplay = document.getElementById('cursor-cost');
    const autoCostDisplay = document.getElementById('auto-cost');
    const multiplierCostDisplay = document.getElementById('multiplier-cost');
    
    const cursorLevelDisplay = document.getElementById('cursor-level');
    const autoLevelDisplay = document.getElementById('auto-level');
    const multiplierLevelDisplay = document.getElementById('multiplier-level');
    
    // Achievement list container
    const achievementList = document.getElementById('achievement-list');
    
    // Game state variables
    let iPoints = 0;
    let pointsPerClick = 1;
    let pointsPerSecond = 0;
    
    // Upgrade variables
    let cursorLevel = 0;
    let autoLevel = 0;
    let multiplierLevel = 0;
    
    let cursorBaseCost = 10;
    let autoBaseCost = 50;
    let multiplierBaseCost = 200;
    
    // Achievements definitions
    const achievements = [
        {
            id: 'achievement-first-click',
            icon: '👆',
            name: 'Premier i',
            description: 'Cliquez sur le i pour la première fois',
            requirement: () => iPoints >= 1,
            unlocked: false
        },
        {
            id: 'achievement-100-points',
            icon: '💯',
            name: 'Collectionneur',
            description: 'Accumulez 100 points i',
            requirement: () => iPoints >= 100,
            unlocked: false
        },
        {
            id: 'achievement-upgrade',
            icon: '⬆️',
            name: 'Amélioré',
            description: 'Achetez votre première amélioration',
            requirement: () => cursorLevel + autoLevel + multiplierLevel > 0,
            unlocked: false
        },
        {
            id: 'achievement-1000-points',
            icon: '🔥',
            name: 'i-Maître',
            description: 'Accumulez 1000 points i',
            requirement: () => iPoints >= 1000,
            unlocked: false
        },
        {
            id: 'achievement-10-upgrades',
            icon: '🌟',
            name: 'Super i-Amélioré',
            description: 'Achetez 10 améliorations au total',
            requirement: () => cursorLevel + autoLevel + multiplierLevel >= 10,
            unlocked: false
        }
    ];
    
    // Load saved game if exists
    loadGame();
    
    // Initialize achievements
    initializeAchievements();
    
    // Click event for the main i button
    if (mainIButton) {
        mainIButton.addEventListener('click', () => {
            incrementPoints(pointsPerClick);
            createFloatingPoint(pointsPerClick);
            checkAchievements();
        });
    }
    
    // Click events for upgrades
    if (cursorUpgrade) {
        cursorUpgrade.addEventListener('click', () => {
            buyUpgrade('cursor');
        });
    }
    
    if (autoUpgrade) {
        autoUpgrade.addEventListener('click', () => {
            buyUpgrade('auto');
        });
    }
    
    if (multiplierUpgrade) {
        multiplierUpgrade.addEventListener('click', () => {
            buyUpgrade('multiplier');
        });
    }
    
    // Auto-incrementer
    setInterval(() => {
        if (pointsPerSecond > 0) {
            incrementPoints(pointsPerSecond);
            checkAchievements();
        }
    }, 1000);
    
    // Auto-save
    setInterval(saveGame, 10000);
    
    // Functions
    function incrementPoints(amount) {
        iPoints += amount;
        updateDisplay();
    }
    
    function updateDisplay() {
        if (iPointsDisplay) {
            iPointsDisplay.textContent = formatNumber(iPoints);
        }
        if (iPerSecondDisplay) {
            iPerSecondDisplay.textContent = formatNumber(pointsPerSecond);
        }
        
        // Update upgrade buttons (enable/disable based on affordability)
        updateUpgradeButtons();
    }
    
    function updateUpgradeButtons() {
        const cursorCost = Math.floor(cursorBaseCost * Math.pow(1.15, cursorLevel));
        const autoCost = Math.floor(autoBaseCost * Math.pow(1.15, autoLevel));
        const multiplierCost = Math.floor(multiplierBaseCost * Math.pow(1.15, multiplierLevel));
        
        if (cursorCostDisplay) {
            cursorCostDisplay.textContent = formatNumber(cursorCost);
        }
        if (autoCostDisplay) {
            autoCostDisplay.textContent = formatNumber(autoCost);
        }
        if (multiplierCostDisplay) {
            multiplierCostDisplay.textContent = formatNumber(multiplierCost);
        }
        
        if (cursorLevelDisplay) {
            cursorLevelDisplay.textContent = cursorLevel;
        }
        if (autoLevelDisplay) {
            autoLevelDisplay.textContent = autoLevel;
        }
        if (multiplierLevelDisplay) {
            multiplierLevelDisplay.textContent = multiplierLevel;
        }
        
        // Enable/disable based on affordability
        if (cursorUpgrade) {
            if (iPoints >= cursorCost) {
                cursorUpgrade.classList.remove('disabled');
            } else {
                cursorUpgrade.classList.add('disabled');
            }
        }
        
        if (autoUpgrade) {
            if (iPoints >= autoCost) {
                autoUpgrade.classList.remove('disabled');
            } else {
                autoUpgrade.classList.add('disabled');
            }
        }
        
        if (multiplierUpgrade) {
            if (iPoints >= multiplierCost) {
                multiplierUpgrade.classList.remove('disabled');
            } else {
                multiplierUpgrade.classList.add('disabled');
            }
        }
    }
    
    function buyUpgrade(type) {
        let cost = 0;
        
        switch (type) {
            case 'cursor':
                cost = Math.floor(cursorBaseCost * Math.pow(1.15, cursorLevel));
                if (iPoints >= cost) {
                    iPoints -= cost;
                    cursorLevel++;
                    pointsPerClick += 1;
                }
                break;
                
            case 'auto':
                cost = Math.floor(autoBaseCost * Math.pow(1.15, autoLevel));
                if (iPoints >= cost) {
                    iPoints -= cost;
                    autoLevel++;
                    pointsPerSecond += 1;
                }
                break;
                
            case 'multiplier':
                cost = Math.floor(multiplierBaseCost * Math.pow(1.15, multiplierLevel));
                if (iPoints >= cost) {
                    iPoints -= cost;
                    multiplierLevel++;
                    pointsPerClick *= 2;
                }
                break;
        }
        
        updateDisplay();
        checkAchievements();
        saveGame();
    }
    
    function createFloatingPoint(amount) {
        if (!mainIButton) return;
        
        const floatingPoint = document.createElement('div');
        floatingPoint.textContent = '+' + formatNumber(amount);
        floatingPoint.className = 'floating-point';
        
        // Random offset to make multiple points appear at different positions
        const offsetX = Math.random() * 60 - 30;
        const offsetY = Math.random() * 20 - 10;
        
        floatingPoint.style.left = `calc(50% + ${offsetX}px)`;
        floatingPoint.style.top = `calc(50% + ${offsetY}px)`;
        
        mainIButton.parentNode.appendChild(floatingPoint);
        
        // Remove after animation completes
        setTimeout(() => {
            if (floatingPoint.parentNode) {
                floatingPoint.parentNode.removeChild(floatingPoint);
            }
        }, 1000);
    }
    
    function initializeAchievements() {
        if (!achievementList) return;
        
        achievementList.innerHTML = '';
        
        achievements.forEach(achievement => {
            const achievementEl = document.createElement('div');
            achievementEl.id = achievement.id;
            achievementEl.className = 'achievement-item' + (achievement.unlocked ? ' unlocked' : '');
            
            achievementEl.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <h4>${achievement.name}</h4>
                    <p>${achievement.description}</p>
                </div>
            `;
            
            achievementList.appendChild(achievementEl);
        });
    }
    
    function checkAchievements() {
        let newUnlocks = false;
        
        achievements.forEach(achievement => {
            if (!achievement.unlocked && achievement.requirement()) {
                achievement.unlocked = true;
                newUnlocks = true;
                
                const achievementEl = document.getElementById(achievement.id);
                if (achievementEl) {
                    achievementEl.classList.add('unlocked');
                    
                    // Create a notification
                    createAchievementNotification(achievement);
                }
            }
        });
        
        if (newUnlocks) {
            saveGame();
        }
    }
    
    function createAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="notification-icon">${achievement.icon}</div>
            <div class="notification-content">
                <h4>Succès débloqué!</h4>
                <p>${achievement.name}</p>
            </div>
        `;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'rgba(74, 42, 234, 0.9)';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '8px';
        notification.style.display = 'flex';
        notification.style.alignItems = 'center';
        notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        notification.style.transform = 'translateX(120%)';
        notification.style.transition = 'transform 0.3s ease';
        notification.style.zIndex = '1000';
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            
            // Remove from DOM after animation
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        } else {
            return Math.floor(num);
        }
    }
    
    function saveGame() {
        const gameData = {
            iPoints,
            pointsPerClick,
            pointsPerSecond,
            cursorLevel,
            autoLevel,
            multiplierLevel,
            achievements: achievements.map(a => ({ id: a.id, unlocked: a.unlocked }))
        };
        
        localStorage.setItem('iClickerSave', JSON.stringify(gameData));
    }
    
    function loadGame() {
        const savedData = localStorage.getItem('iClickerSave');
        
        if (savedData) {
            try {
                const gameData = JSON.parse(savedData);
                
                iPoints = gameData.iPoints || 0;
                pointsPerClick = gameData.pointsPerClick || 1;
                pointsPerSecond = gameData.pointsPerSecond || 0;
                
                cursorLevel = gameData.cursorLevel || 0;
                autoLevel = gameData.autoLevel || 0;
                multiplierLevel = gameData.multiplierLevel || 0;
                
                // Restore achievements
                if (gameData.achievements) {
                    gameData.achievements.forEach(savedAchievement => {
                        const achievement = achievements.find(a => a.id === savedAchievement.id);
                        if (achievement) {
                            achievement.unlocked = savedAchievement.unlocked;
                        }
                    });
                }
                
                updateDisplay();
            } catch (error) {
                console.error('Error loading saved game', error);
            }
        }
    }
});

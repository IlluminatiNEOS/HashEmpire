// PROJECT ORIENTAL: Achievement System
// Gamification and milestone tracking for The Sovereign Supply-Chain Simulation

class AchievementSystem {
    constructor(game) {
        this.game = game;
        this.achievements = [];
        this.unlockedAchievements = new Set();
        this.notificationQueue = [];
        this.initializeAchievements();
        this.createNotificationSystem();
        this.startChecking();
    }

    initializeAchievements() {
        // Check if game config has custom achievements
        if (this.game.config && window.EMPIRE_DATA && window.EMPIRE_DATA[this.game.empireKey]?.achievements) {
            const customAchievements = window.EMPIRE_DATA[this.game.empireKey].achievements;
            
            this.achievements = customAchievements.map(a => ({
                ...a,
                tier: a.tier || 'bronze',
                condition: () => {
                    if (a.type === 'clicks') return this.game.gameState.totalClicks >= a.threshold;
                    if (a.type === 'currency') return this.game.gameState.totalHashEarned >= a.threshold;
                    if (a.type === 'level') return this.game.gameState.illuminationLevel >= a.threshold;
                    return false;
                }
            }));
            
            // Add some generic ones if list is short
            if (this.achievements.length < 5) {
                this.addGenericAchievements();
            }
            return;
        }

        this.achievements = [
            // Clicking Achievements
            {
                id: 'first_click',
                name: 'The First Seed',
                description: 'Click the hashish plant for the first time',
                icon: '🌱',
                condition: () => this.game.gameState.totalClicks >= 1,
                reward: { type: 'multiplier', value: 1.1 },
                tier: 'bronze'
            },
            {
                id: 'hundred_clicks',
                name: 'Street Hustler',
                description: 'Click 100 times',
                icon: '👊',
                condition: () => this.game.gameState.totalClicks >= 100,
                reward: { type: 'hashUnits', value: 500 },
                tier: 'bronze'
            },
            {
                id: 'thousand_clicks',
                name: 'Click Master',
                description: 'Click 1,000 times',
                icon: '⚡',
                condition: () => this.game.gameState.totalClicks >= 1000,
                reward: { type: 'clickPower', value: 2 },
                tier: 'silver'
            },
            {
                id: 'ten_thousand_clicks',
                name: 'Digital Overlord',
                description: 'Click 10,000 times',
                icon: '👑',
                condition: () => this.game.gameState.totalClicks >= 10000,
                reward: { type: 'multiplier', value: 1.5 },
                tier: 'gold'
            },

            // Hash Units Achievements
            {
                id: 'first_thousand',
                name: 'Kilounit Milestone',
                description: 'Accumulate 1,000 Hash Units',
                icon: '💰',
                condition: () => this.game.gameState.totalHashEarned >= 1000,
                reward: { type: 'hashUnits', value: 1000 },
                tier: 'bronze'
            },
            {
                id: 'million_hash',
                name: 'Hash Millionaire',
                description: 'Accumulate 1,000,000 Hash Units',
                icon: '💎',
                condition: () => this.game.gameState.totalHashEarned >= 1000000,
                reward: { type: 'multiplier', value: 1.25 },
                tier: 'gold'
            },
            {
                id: 'billion_hash',
                name: 'Hash Billionaire',
                description: 'Accumulate 1,000,000,000 Hash Units',
                icon: '🏆',
                condition: () => this.game.gameState.totalHashEarned >= 1000000000,
                reward: { type: 'enlightenmentTokens', value: 5 },
                tier: 'platinum'
            },

            // Illumination Level Achievements
            {
                id: 'level_5',
                name: 'Street Graduate',
                description: 'Reach Illumination Level 5',
                icon: '🎓',
                condition: () => this.game.gameState.illuminationLevel >= 5,
                reward: { type: 'multiplier', value: 1.2 },
                tier: 'bronze'
            },
            {
                id: 'level_10',
                name: 'Local Entrepreneur',
                description: 'Reach Illumination Level 10',
                icon: '🏢',
                condition: () => this.game.gameState.illuminationLevel >= 10,
                reward: { type: 'hashUnits', value: 50000 },
                tier: 'silver'
            },
            {
                id: 'level_15',
                name: 'Regional Coordinator',
                description: 'Reach Illumination Level 15',
                icon: '🌍',
                condition: () => this.game.gameState.illuminationLevel >= 15,
                reward: { type: 'multiplier', value: 1.3 },
                tier: 'gold'
            },
            {
                id: 'level_25',
                name: 'Shadow Diplomat',
                description: 'Reach Illumination Level 25',
                icon: '🕴️',
                condition: () => this.game.gameState.illuminationLevel >= 25,
                reward: { type: 'enlightenmentTokens', value: 3 },
                tier: 'platinum'
            },
            {
                id: 'level_33',
                name: 'Grand Architect',
                description: 'Reach the ultimate Illumination Level 33',
                icon: '👁️',
                condition: () => this.game.gameState.illuminationLevel >= 33,
                reward: { type: 'multiplier', value: 2.0 },
                tier: 'legendary'
            },

            // Upgrade Achievements
            {
                id: 'first_upgrade',
                name: 'First Investment',
                description: 'Purchase your first upgrade',
                icon: '🛒',
                condition: () => this.game.getTotalUpgrades() >= 1,
                reward: { type: 'hashUnits', value: 100 },
                tier: 'bronze'
            },
            {
                id: 'ten_upgrades',
                name: 'Network Builder',
                description: 'Purchase 10 upgrades',
                icon: '🔗',
                condition: () => this.game.getTotalUpgrades() >= 10,
                reward: { type: 'multiplier', value: 1.15 },
                tier: 'silver'
            },
            {
                id: 'fifty_upgrades',
                name: 'Empire Architect',
                description: 'Purchase 50 upgrades',
                icon: '🏗️',
                condition: () => this.game.getTotalUpgrades() >= 50,
                reward: { type: 'multiplier', value: 1.4 },
                tier: 'gold'
            },

            // Special Achievements
            {
                id: 'morocco_connection',
                name: 'Moroccan Gateway',
                description: 'Establish the Morocco connection',
                icon: '🇲🇦',
                condition: () => this.game.upgrades.production.find(u => u.id === 'port_connections')?.owned > 0,
                reward: { type: 'multiplier', value: 1.2 },
                tier: 'gold'
            },
            {
                id: 'poznan_hub',
                name: 'Polish Operations',
                description: 'Establish the Poznań Hub',
                icon: '🇵🇱',
                condition: () => this.game.upgrades.production.find(u => u.id === 'poznan_hub')?.owned > 0,
                reward: { type: 'multiplier', value: 1.25 },
                tier: 'gold'
            },
            {
                id: 'first_prestige',
                name: 'Enlightened Reset',
                description: 'Perform your first prestige',
                icon: '✨',
                condition: () => this.game.gameState.prestigeLevel >= 1,
                reward: { type: 'enlightenmentTokens', value: 2 },
                tier: 'platinum'
            },
            {
                id: 'risk_taker',
                name: 'High Risk, High Reward',
                description: 'Choose the underground path 3 times',
                icon: '⚡',
                condition: () => this.game.analytics.playerChoices.filter(c => c.path === 'underground').length >= 3,
                reward: { type: 'multiplier', value: 1.3 },
                tier: 'gold'
            },
            {
                id: 'safe_player',
                name: 'Steady Growth',
                description: 'Choose the semi-legal path 5 times',
                icon: '🛡️',
                condition: () => this.game.analytics.playerChoices.filter(c => c.path === 'semi_legal').length >= 5,
                reward: { type: 'multiplier', value: 1.2 },
                tier: 'silver'
            },
            {
                id: 'terminal_user',
                name: 'System Administrator',
                description: 'Use the terminal interface',
                icon: '💻',
                condition: () => window.terminal && window.terminal.commandHistory.length >= 5,
                reward: { type: 'hashUnits', value: 10000 },
                tier: 'silver'
            },
            {
                id: 'data_exporter',
                name: 'Intelligence Analyst',
                description: 'Export analytics data',
                icon: '📊',
                condition: () => window.terminal && window.terminal.commandHistory.includes('export'),
                reward: { type: 'enlightenmentTokens', value: 1 },
                tier: 'gold'
            },

            // Time-based Achievements
            {
                id: 'dedicated_player',
                name: 'Dedicated Operator',
                description: 'Play for 30 minutes',
                icon: '⏰',
                condition: () => (Date.now() - this.game.gameState.gameStartTime) >= 30 * 60 * 1000,
                reward: { type: 'multiplier', value: 1.1 },
                tier: 'bronze'
            },
            {
                id: 'marathon_session',
                name: 'Marathon Session',
                description: 'Play for 2 hours',
                icon: '🏃',
                condition: () => (Date.now() - this.game.gameState.gameStartTime) >= 2 * 60 * 60 * 1000,
                reward: { type: 'multiplier', value: 1.25 },
                tier: 'gold'
            }
        ];
    }

    addGenericAchievements() {
        this.achievements.push({
            id: 'generic_master',
            name: 'Empire Builder',
            description: 'Purchase 10 upgrades',
            icon: '🏗️',
            condition: () => this.game.getTotalUpgrades() >= 10,
            reward: { type: 'multiplier', value: 1.2 },
            tier: 'silver'
        });
    }

    createNotificationSystem() {
        // Create notification container
        const notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);

        // Add notification styles
        const style = document.createElement('style');
        style.textContent = `
            .notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 4000;
                pointer-events: none;
            }

            .achievement-notification {
                background: linear-gradient(45deg, rgba(0, 255, 0, 0.9), rgba(255, 255, 0, 0.9));
                border: 2px solid #ffff00;
                border-radius: 10px;
                padding: 15px 20px;
                margin-bottom: 10px;
                min-width: 300px;
                color: #000;
                font-family: 'VT323', monospace;
                font-size: 1.1rem;
                box-shadow: 0 0 20px rgba(255, 255, 0, 0.5);
                animation: slideInRight 0.5s ease, fadeOut 0.5s ease 4.5s;
                pointer-events: auto;
                cursor: pointer;
            }

            .achievement-notification.bronze {
                background: linear-gradient(45deg, rgba(205, 127, 50, 0.9), rgba(255, 165, 0, 0.9));
                border-color: #cd7f32;
                box-shadow: 0 0 20px rgba(205, 127, 50, 0.5);
            }

            .achievement-notification.silver {
                background: linear-gradient(45deg, rgba(192, 192, 192, 0.9), rgba(220, 220, 220, 0.9));
                border-color: #c0c0c0;
                box-shadow: 0 0 20px rgba(192, 192, 192, 0.5);
            }

            .achievement-notification.gold {
                background: linear-gradient(45deg, rgba(255, 215, 0, 0.9), rgba(255, 255, 0, 0.9));
                border-color: #ffd700;
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
            }

            .achievement-notification.platinum {
                background: linear-gradient(45deg, rgba(229, 228, 226, 0.9), rgba(255, 255, 255, 0.9));
                border-color: #e5e4e2;
                box-shadow: 0 0 20px rgba(229, 228, 226, 0.5);
            }

            .achievement-notification.legendary {
                background: linear-gradient(45deg, rgba(138, 43, 226, 0.9), rgba(255, 0, 255, 0.9));
                border-color: #8a2be2;
                box-shadow: 0 0 20px rgba(138, 43, 226, 0.5);
                color: #fff;
            }

            .achievement-header {
                display: flex;
                align-items: center;
                margin-bottom: 5px;
            }

            .achievement-icon {
                font-size: 1.5rem;
                margin-right: 10px;
            }

            .achievement-title {
                font-weight: bold;
                font-size: 1.2rem;
            }

            .achievement-description {
                margin-bottom: 8px;
                opacity: 0.8;
            }

            .achievement-reward {
                font-size: 0.9rem;
                font-weight: bold;
                color: #006400;
            }

            .achievement-notification.legendary .achievement-reward {
                color: #ffff00;
            }

            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                    transform: translateX(100%);
                }
            }

            .achievement-popup {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.95);
                border: 3px solid #ffff00;
                border-radius: 15px;
                padding: 30px;
                z-index: 5000;
                text-align: center;
                min-width: 400px;
                box-shadow: 0 0 50px rgba(255, 255, 0, 0.7);
            }

            .achievement-popup h2 {
                color: #ffff00;
                margin-bottom: 20px;
                font-family: 'Orbitron', monospace;
            }

            .achievement-popup .achievement-icon {
                font-size: 4rem;
                margin-bottom: 15px;
            }

            .achievement-close {
                background: rgba(0, 255, 0, 0.2);
                border: 1px solid #00ff00;
                color: #00ff00;
                padding: 10px 20px;
                margin-top: 20px;
                cursor: pointer;
                border-radius: 5px;
                font-family: 'VT323', monospace;
            }
        `;
        document.head.appendChild(style);
    }

    startChecking() {
        // Check achievements every 2 seconds
        setInterval(() => {
            this.checkAchievements();
        }, 2000);
    }

    checkAchievements() {
        this.achievements.forEach(achievement => {
            if (!this.unlockedAchievements.has(achievement.id) && achievement.condition()) {
                this.unlockAchievement(achievement);
            }
        });
    }

    unlockAchievement(achievement) {
        this.unlockedAchievements.add(achievement.id);
        
        // Apply reward
        this.applyReward(achievement.reward);
        
        // Show notification
        this.showNotification(achievement);
        
        // Log achievement
        this.game.addToLog(`🏆 Achievement Unlocked: ${achievement.name}`);
        
        // Save achievement progress
        this.saveProgress();
    }

    applyReward(reward) {
        switch (reward.type) {
            case 'hashUnits':
                this.game.gameState.hashUnits += reward.value;
                break;
            case 'multiplier':
                this.game.gameState.globalMultiplier *= reward.value;
                break;
            case 'clickPower':
                this.game.gameState.clickPower += reward.value;
                break;
            case 'enlightenmentTokens':
                this.game.gameState.enlightenmentTokens += reward.value;
                break;
        }
        this.game.updateDisplay();
    }

    showNotification(achievement) {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `achievement-notification ${achievement.tier}`;
        
        const rewardText = this.getRewardText(achievement.reward);
        
        notification.innerHTML = `
            <div class="achievement-header">
                <span class="achievement-icon">${achievement.icon}</span>
                <span class="achievement-title">${achievement.name}</span>
            </div>
            <div class="achievement-description">${achievement.description}</div>
            <div class="achievement-reward">Reward: ${rewardText}</div>
        `;

        // Click to show detailed popup
        notification.addEventListener('click', () => {
            this.showAchievementPopup(achievement);
        });

        container.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }

    showAchievementPopup(achievement) {
        const popup = document.createElement('div');
        popup.className = 'achievement-popup';
        popup.innerHTML = `
            <h2>🏆 ACHIEVEMENT UNLOCKED</h2>
            <div class="achievement-icon">${achievement.icon}</div>
            <h3 style="color: #ffff00; margin-bottom: 10px;">${achievement.name}</h3>
            <p style="color: #00ff00; margin-bottom: 15px;">${achievement.description}</p>
            <p style="color: #ff6600;">Tier: ${achievement.tier.toUpperCase()}</p>
            <p style="color: #00ffff;">Reward: ${this.getRewardText(achievement.reward)}</p>
            <button class="achievement-close" onclick="this.parentNode.remove()">CONTINUE</button>
        `;
        
        document.body.appendChild(popup);
        
        // Auto-close after 10 seconds
        setTimeout(() => {
            if (popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 10000);
    }

    getRewardText(reward) {
        switch (reward.type) {
            case 'hashUnits':
                return `+${this.game.formatNumber(reward.value)} Hash Units`;
            case 'multiplier':
                return `${reward.value}x Global Multiplier`;
            case 'clickPower':
                return `+${reward.value} Click Power`;
            case 'enlightenmentTokens':
                return `+${reward.value} Enlightenment Tokens`;
            default:
                return 'Unknown Reward';
        }
    }

    getUnlockedCount() {
        return this.unlockedAchievements.size;
    }

    getTotalCount() {
        return this.achievements.length;
    }

    getProgress() {
        return {
            unlocked: this.getUnlockedCount(),
            total: this.getTotalCount(),
            percentage: Math.round((this.getUnlockedCount() / this.getTotalCount()) * 100)
        };
    }

    saveProgress() {
        const saveData = {
            unlockedAchievements: Array.from(this.unlockedAchievements),
            timestamp: Date.now()
        };
        localStorage.setItem('hashish_empire_achievements', JSON.stringify(saveData));
    }

    loadProgress() {
        const saveData = localStorage.getItem('hashish_empire_achievements');
        if (saveData) {
            try {
                const data = JSON.parse(saveData);
                this.unlockedAchievements = new Set(data.unlockedAchievements || []);
            } catch (e) {
                console.warn('Failed to load achievement progress');
            }
        }
    }

    // Manual achievement unlock for testing
    unlockAchievementById(id) {
        const achievement = this.achievements.find(a => a.id === id);
        if (achievement && !this.unlockedAchievements.has(id)) {
            this.unlockAchievement(achievement);
        }
    }

    // Get achievement statistics for terminal
    getStats() {
        const progress = this.getProgress();
        const tierCounts = {};
        
        this.achievements.forEach(achievement => {
            if (!tierCounts[achievement.tier]) {
                tierCounts[achievement.tier] = { total: 0, unlocked: 0 };
            }
            tierCounts[achievement.tier].total++;
            if (this.unlockedAchievements.has(achievement.id)) {
                tierCounts[achievement.tier].unlocked++;
            }
        });

        return {
            progress,
            tierCounts,
            recentAchievements: Array.from(this.unlockedAchievements).slice(-5)
        };
    }
}

// Initialize achievement system when game loads
const initAchievements = () => {
    if (window.game && !window.achievements) {
        window.achievements = new AchievementSystem(window.game);
        window.achievements.loadProgress();
    }
};

if (window.game) {
    initAchievements();
} else {
    window.addEventListener('game-ready', initAchievements);
}

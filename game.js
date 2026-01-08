// Hashish Empire: The Illumination Clicker - Game Engine
// Reality Game with Analytics Tracking for Oriental Group

class HashishEmpire {
    constructor() {
        this.gameState = {
            hashUnits: 0,
            hashPerSecond: 0,
            clickPower: 1,
            illuminationLevel: 1,
            prestigeLevel: 0,
            enlightenmentTokens: 0,
            globalMultiplier: 1.0,
            totalClicks: 0,
            totalHashEarned: 0,
            gameStartTime: Date.now(),
            lastSave: Date.now()
        };

        this.upgrades = {
            production: [],
            distribution: [],
            influence: []
        };

        this.analytics = {
            playerChoices: [],
            upgradePatterns: [],
            eventResponses: [],
            sessionData: {
                startTime: Date.now(),
                clicksPerMinute: 0,
                strategicDecisions: []
            }
        };

        // Click / CPS / Combo helpers
        this.clickTimestamps = []; // ms timestamps for CPS calculation
        this.clickBuffer = { count: 0, value: 0, timer: null }; // aggregate floating numbers
        this.combo = { count: 0, lastTime: 0 }; // combo counter for quick clicks
        this.clickAggregationWindow = 120; // ms to aggregate floating numbers
        this.comboTimeout = 800; // ms to expire combo
        this.displayedCPS = 0;

        this.initializeUpgrades();
        this.initializeEventListeners();
        this.startGameLoop();
        this.loadGame();
        this.updateDisplay();
    }

    // Initialize all upgrade tiers and paths
    initializeUpgrades() {
        // Tier 1: Street-Level Operations (Levels 1-5)
        this.upgrades.production = [
            {
                id: 'young_dealer',
                name: 'The Young Dealer',
                description: 'A street-smart kid who knows the corners',
                cost: 15,
                baseProduction: 0.1,
                owned: 0,
                tier: 1,
                unlockLevel: 1,
                category: 'production'
            },
            {
                id: 'street_corner',
                name: 'Street Corner Stand',
                description: 'Prime real estate for discrete transactions',
                cost: 100,
                baseProduction: 1,
                owned: 0,
                tier: 1,
                unlockLevel: 2,
                category: 'production'
            },
            {
                id: 'local_network',
                name: 'Local Network',
                description: 'Word of mouth spreads like wildfire',
                cost: 500,
                baseProduction: 5,
                owned: 0,
                tier: 1,
                unlockLevel: 3,
                category: 'production'
            },
            {
                id: 'bicycle_delivery',
                name: 'Bicycle Delivery',
                description: 'Fast, silent, and eco-friendly distribution',
                cost: 2000,
                baseProduction: 20,
                owned: 0,
                tier: 1,
                unlockLevel: 4,
                category: 'production'
            },
            // Tier 2: Production & Local Commerce (Levels 6-10)
            {
                id: 'hashish_bakery',
                name: 'The Hashish Bakery',
                description: 'Special cakes for special customers',
                cost: 10000,
                baseProduction: 100,
                owned: 0,
                tier: 2,
                unlockLevel: 6,
                category: 'production',
                pathChoice: true,
                paths: ['underground', 'semi_legal']
            },
            {
                id: 'coffee_shop',
                name: 'Coffee Shop Front',
                description: 'The perfect cover for afternoon meetings',
                cost: 25000,
                baseProduction: 250,
                owned: 0,
                tier: 2,
                unlockLevel: 7,
                category: 'production'
            },
            {
                id: 'dispensary',
                name: 'Discreet Dispensary',
                description: 'Medical purposes only, of course',
                cost: 75000,
                baseProduction: 750,
                owned: 0,
                tier: 2,
                unlockLevel: 8,
                category: 'production'
            },
            {
                id: 'urban_grow',
                name: 'Urban Grow-Op',
                description: 'Vertical farming meets ancient wisdom',
                cost: 200000,
                baseProduction: 2000,
                owned: 0,
                tier: 2,
                unlockLevel: 9,
                category: 'production'
            },
            // Tier 3: Regional Expansion (Levels 11-15)
            {
                id: 'courier_network',
                name: 'The Courier Network',
                description: 'Professional logistics across borders',
                cost: 500000,
                baseProduction: 5000,
                owned: 0,
                tier: 3,
                unlockLevel: 11,
                category: 'production'
            },
            {
                id: 'hidden_warehouses',
                name: 'Hidden Warehouses',
                description: 'Storage facilities in plain sight',
                cost: 1500000,
                baseProduction: 15000,
                owned: 0,
                tier: 3,
                unlockLevel: 12,
                category: 'production'
            },
            {
                id: 'port_connections',
                name: 'Port Connections',
                description: 'Maritime routes from Morocco to Europe',
                cost: 5000000,
                baseProduction: 50000,
                owned: 0,
                tier: 3,
                unlockLevel: 13,
                category: 'production',
                specialEffect: 'morocco_connection'
            },
            {
                id: 'poznan_hub',
                name: 'The Poznań Hub',
                description: 'Central European distribution center',
                cost: 15000000,
                baseProduction: 150000,
                owned: 0,
                tier: 3,
                unlockLevel: 14,
                category: 'production',
                specialEffect: 'poland_connection'
            }
        ];

        this.upgrades.distribution = [
            // Distribution upgrades focusing on logistics and reach
            {
                id: 'encrypted_comms',
                name: 'Encrypted Communications',
                description: 'Secure channels for coordination',
                cost: 1000,
                effect: 'click_multiplier',
                value: 1.5,
                owned: 0,
                tier: 1,
                unlockLevel: 3,
                category: 'distribution'
            },
            {
                id: 'supply_chain',
                name: 'Supply Chain Optimization',
                description: 'Efficiency through technology',
                cost: 50000,
                effect: 'production_multiplier',
                value: 1.25,
                owned: 0,
                tier: 2,
                unlockLevel: 8,
                category: 'distribution'
            },
            {
                id: 'dark_web_market',
                name: 'Dark Web Marketplace',
                description: 'Digital expansion of operations',
                cost: 500000,
                effect: 'global_multiplier',
                value: 1.5,
                owned: 0,
                tier: 3,
                unlockLevel: 12,
                category: 'distribution'
            }
        ];

        this.upgrades.influence = [
            // Influence upgrades for higher-tier gameplay
            {
                id: 'local_politician',
                name: 'Local Politician',
                description: 'A friend in city hall',
                cost: 100000,
                effect: 'risk_reduction',
                value: 0.1,
                owned: 0,
                tier: 2,
                unlockLevel: 10,
                category: 'influence'
            },
            {
                id: 'media_influence',
                name: 'Media Influence',
                description: 'Shaping public opinion',
                cost: 1000000,
                effect: 'prestige_bonus',
                value: 1.2,
                owned: 0,
                tier: 3,
                unlockLevel: 15,
                category: 'influence'
            },
            {
                id: 'think_tank',
                name: 'Think Tank Funding',
                description: 'Academic legitimacy for policy change',
                cost: 10000000,
                effect: 'enlightenment_bonus',
                value: 2,
                owned: 0,
                tier: 4,
                unlockLevel: 20,
                category: 'influence'
            }
        ];
    }

    // Initialize event listeners
    initializeEventListeners() {
        // Main clicking mechanism
        const hashishPlant = document.getElementById('hashish-plant');
        hashishPlant.addEventListener('click', (e) => this.handleClick(e));

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Save/Load/Reset buttons
        document.getElementById('save-btn').addEventListener('click', () => this.saveGame());
        document.getElementById('load-btn').addEventListener('click', () => this.loadGame());
        document.getElementById('reset-btn').addEventListener('click', () => this.resetGame());

        // Prestige button
        document.getElementById('prestige-btn').addEventListener('click', () => this.prestige());

        // Modal event handlers
        document.getElementById('modal-btn1').addEventListener('click', () => {
            if (this.currentEvent) {
                this.handleEventResponse(1);
            } else {
                this.handleEventChoice(1);
            }
        });
        document.getElementById('modal-btn2').addEventListener('click', () => {
            if (this.currentEvent) {
                this.handleEventResponse(2);
            } else {
                this.handleEventChoice(2);
            }
        });
    }

    // Main clicking handler with analytics
    handleClick(event) {
        const now = Date.now();

        // Compute combo
        if (now - this.combo.lastTime <= this.comboTimeout) {
            this.combo.count++;
        } else {
            this.combo.count = 1;
        }
        this.combo.lastTime = now;

        // Compute current click value with combo multiplier
        const comboMultiplier = 1 + (this.combo.count - 1) * 0.1;
        const clickValue = this.gameState.clickPower * this.gameState.globalMultiplier * comboMultiplier;

        // Immediately apply resources (keeps game logic responsive)
        this.gameState.hashUnits += clickValue;
        this.gameState.totalClicks++;
        this.gameState.totalHashEarned += clickValue;

        // Add to click buffer for aggregated floating numbers
        this.clickBuffer.count++;
        this.clickBuffer.value += clickValue;
        if (!this.clickBuffer.timer) {
            this.clickBuffer.timer = setTimeout(() => this.flushClickBuffer(), this.clickAggregationWindow);
        }

        // Pulse plant for immediate tactile feedback
        const plant = document.getElementById('hashish-plant');
        if (plant) {
            plant.classList.add('pulse');
            setTimeout(() => plant.classList.remove('pulse'), 80);
        }

        // Update combo display
        const comboEl = document.getElementById('combo-display');
        if (comboEl) {
            if (this.combo.count > 1) {
                comboEl.classList.remove('hidden');
                comboEl.textContent = `x${this.combo.count}`;
                // small pop animation
                comboEl.style.transform = 'translateX(-50%) scale(1.15)';
                setTimeout(() => comboEl.style.transform = 'translateX(-50%) scale(1)', 120);
            } else {
                comboEl.classList.add('hidden');
            }
        }

        // Analytics tracking
        this.trackClick();

        // Update display and progression
        this.updateDisplay();
        this.checkLevelProgression();

        // Random events
        if (Math.random() < 0.001) { // 0.1% chance per click
            this.triggerRandomEvent();
        }
    }


    // Visual click effect
    showClickEffect(event, value) {
        const clickEffect = document.getElementById('click-effect');
        const clickCounter = document.getElementById('click-counter');
        const plant = document.getElementById('hashish-plant');

        // Animate click effect
        clickEffect.textContent = `+${this.formatNumber(value)}`;
        clickEffect.style.opacity = '1';
        clickEffect.style.transform = 'translate(-50%, -70%) scale(1.2)';

        setTimeout(() => {
            clickEffect.style.opacity = '0';
            clickEffect.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 300);

        // Animate click counter
        clickCounter.textContent = `+${this.formatNumber(value)}`;
        clickCounter.style.opacity = '1';
        clickCounter.style.transform = 'translateX(-50%) translateY(-10px)';

        setTimeout(() => {
            clickCounter.style.opacity = '0';
            clickCounter.style.transform = 'translateX(-50%) translateY(0)';
        }, 500);

        // Plant pulse effect
        plant.classList.add('pulse');
        setTimeout(() => plant.classList.remove('pulse'), 300);
    }

    // Purchase upgrade with analytics tracking
    purchaseUpgrade(upgradeId, category) {
        const upgrade = this.upgrades[category].find(u => u.id === upgradeId);
        if (!upgrade) return false;

        const cost = this.getUpgradeCost(upgrade);
        if (this.gameState.hashUnits < cost) return false;

        // Deduct cost
        this.gameState.hashUnits -= cost;
        upgrade.owned++;

        // Apply upgrade effects
        if (upgrade.baseProduction) {
            this.gameState.hashPerSecond += upgrade.baseProduction * this.gameState.globalMultiplier;
        }


        // Track analytics
        this.analytics.upgradePatterns.push({
            upgradeId: upgradeId,
            category: category,
            cost: cost,
            level: upgrade.owned,
            gameTime: Date.now() - this.gameState.gameStartTime,
            hashUnits: this.gameState.hashUnits
        });

        // Handle special effects
        this.handleSpecialEffects(upgrade);

        // Handle path choices
        if (upgrade.pathChoice && upgrade.owned === 1) {
            this.showPathChoice(upgrade);
        }

        this.updateDisplay();
        this.addToLog(`Purchased: ${upgrade.name} (Level ${upgrade.owned})`);
        
        return true;
    }

    // Calculate upgrade cost with scaling
    getUpgradeCost(upgrade) {
        return Math.floor(upgrade.cost * Math.pow(1.15, upgrade.owned));
    }

    // Handle special upgrade effects
    handleSpecialEffects(upgrade) {
        switch (upgrade.specialEffect) {
            case 'morocco_connection':
                this.addToAnalytics('Morocco connection established - Global supply chain activated');
                this.gameState.globalMultiplier *= 1.1;
                break;
            case 'poland_connection':
                this.addToAnalytics('Poznań hub operational - European distribution optimized');
                this.gameState.globalMultiplier *= 1.15;
                break;
        }
    }


    // Show path choice modal
    showPathChoice(upgrade) {
        const modal = document.getElementById('event-modal');
        const title = document.getElementById('modal-title');
        const description = document.getElementById('modal-description');
        const btn1 = document.getElementById('modal-btn1');
        const btn2 = document.getElementById('modal-btn2');

        title.textContent = 'Strategic Decision';
        description.textContent = `Choose your path for ${upgrade.name}:`;
        btn1.textContent = 'Underground (High Risk/Reward)';
        btn2.textContent = 'Semi-Legal (Safer Growth)';

        modal.classList.remove('hidden');
        
        this.currentPathChoice = upgrade;
    }

    // Handle path choice selection
    handleEventChoice(choice) {
        const modal = document.getElementById('event-modal');
        modal.classList.add('hidden');

        if (this.currentPathChoice) {
            const path = choice === 1 ? 'underground' : 'semi_legal';
            this.analytics.playerChoices.push({
                upgrade: this.currentPathChoice.id,
                path: path,
                timestamp: Date.now(),
                gameState: { ...this.gameState }
            });

            // Apply path effects
            if (path === 'underground') {
                this.gameState.globalMultiplier *= 1.3;
                this.addToLog('Chose underground path - Higher risks, higher rewards');
            } else {
                this.gameState.globalMultiplier *= 1.1;
                this.addToLog('Chose semi-legal path - Steady and sustainable growth');
            }

            this.currentPathChoice = null;
        }
    }

    // Random events system
    triggerRandomEvent() {
        const events = [
            {
                title: 'Police Raid!',
                description: 'Authorities are closing in on one of your operations.',
                option1: { text: 'Pay Bribe (50% HU)', cost: 0.5 },
                option2: { text: 'Take the Loss (20% HU)', cost: 0.2 }
            },
            {
                title: 'New Market Opportunity',
                description: 'A new demographic shows interest in your products.',
                option1: { text: 'Invest Heavily (30% HU)', cost: 0.3, reward: 2.0 },
                option2: { text: 'Conservative Approach (10% HU)', cost: 0.1, reward: 1.2 }
            },
            {
                title: 'Competitor Threat',
                description: 'A rival organization is moving into your territory.',
                option1: { text: 'Aggressive Response (40% HU)', cost: 0.4 },
                option2: { text: 'Negotiate Territory (15% HU)', cost: 0.15 }
            }
        ];

        const event = events[Math.floor(Math.random() * events.length)];
        this.showEvent(event);
    }

    // Show event modal
    showEvent(event) {
        const modal = document.getElementById('event-modal');
        const title = document.getElementById('modal-title');
        const description = document.getElementById('modal-description');
        const btn1 = document.getElementById('modal-btn1');
        const btn2 = document.getElementById('modal-btn2');

        title.textContent = event.title;
        description.textContent = event.description;
        btn1.textContent = event.option1.text;
        btn2.textContent = event.option2.text;

        modal.classList.remove('hidden');
        this.currentEvent = event;
    }

    // Handle event response
    handleEventResponse(choice) {
        if (!this.currentEvent) return;

        const option = choice === 1 ? this.currentEvent.option1 : this.currentEvent.option2;
        const cost = this.gameState.hashUnits * option.cost;
        
        this.gameState.hashUnits -= cost;
        
        if (option.reward) {
            setTimeout(() => {
                this.gameState.hashUnits *= option.reward;
                this.addToLog(`Event reward: ${option.reward}x multiplier applied!`);
            }, 2000);
        }

        // Analytics tracking
        this.analytics.eventResponses.push({
            event: this.currentEvent.title,
            choice: choice,
            cost: cost,
            timestamp: Date.now(),
            gameState: { ...this.gameState }
        });

        this.addToLog(`Event: ${this.currentEvent.title} - ${option.text}`);
        this.currentEvent = null;
    }

    // Prestige system
    prestige() {
        if (this.gameState.illuminationLevel < 10) return;

        const tokensEarned = Math.floor(this.gameState.illuminationLevel / 5);
        this.gameState.enlightenmentTokens += tokensEarned;
        this.gameState.prestigeLevel++;
        this.gameState.globalMultiplier += 0.1 * tokensEarned;

        // Reset progress
        this.gameState.hashUnits = 0;
        this.gameState.hashPerSecond = 0;
        this.gameState.illuminationLevel = 1;
        
        // Reset upgrades
        Object.values(this.upgrades).forEach(category => {
            category.forEach(upgrade => upgrade.owned = 0);
        });

        this.addToLog(`PRESTIGE! Gained ${tokensEarned} Enlightenment Tokens`);
        this.updateDisplay();
    }

    // Level progression system
    checkLevelProgression() {
        const thresholds = this.getLevelThresholds();
        const idx = thresholds.findIndex(threshold => this.gameState.totalHashEarned < threshold);
        let newLevel;
        if (idx === -1) {
            // totalHashEarned exceeds all thresholds -> assign max level
            newLevel = thresholds.length - 1;
        } else {
            newLevel = Math.max(0, idx - 1);
        }

        if (newLevel > this.gameState.illuminationLevel) {
            this.gameState.illuminationLevel = newLevel;
            this.updateTierDisplay();
            this.addToLog(`ILLUMINATION LEVEL UP! Reached Level ${newLevel}`);

            // Show Illuminati eye at higher levels
            if (newLevel >= 15) {
                document.getElementById('illuminati-eye').classList.remove('hidden');
            }
        }
    }

    // Update tier display based on level
    updateTierDisplay() {
        const level = this.gameState.illuminationLevel;
        const tierTitle = document.getElementById('tier-title');
        const tierDescription = document.getElementById('tier-description');
        const levelName = document.getElementById('level-name');

        let tier, title, description, name;

        if (level <= 5) {
            tier = 1;
            title = 'Tier 1: Street-Level Operations';
            description = 'The seed is planted. Now, nurture it.';
            name = 'Street Dealer';
        } else if (level <= 10) {
            tier = 2;
            title = 'Tier 2: Production & Local Commerce';
            description = 'From clandestine to clandestine chic.';
            name = 'Local Entrepreneur';
        } else if (level <= 15) {
            tier = 3;
            title = 'Tier 3: Regional Expansion & Logistics';
            description = 'The tentacles spread. Europe awaits.';
            name = 'Regional Coordinator';
        } else if (level <= 20) {
            tier = 4;
            title = 'Tier 4: National Influence & Media Control';
            description = 'Perception is reality. And we own reality.';
            name = 'Media Manipulator';
        } else if (level <= 25) {
            tier = 5;
            title = 'Tier 5: Global Lobbying & Power Structures';
            description = 'The world dances to our tune.';
            name = 'Shadow Diplomat';
        } else {
            tier = 6;
            title = 'Tier 6: The Illumination Council';
            description = 'The Eye watches. The Empire endures. You are the Architect.';
            name = 'Grand Architect';
        }

        tierTitle.textContent = title;
        tierDescription.textContent = description;
        levelName.textContent = name;
    }

    // Tab switching
    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');

        // Render upgrades for the selected tab
        if (tabName !== 'prestige') {
            this.renderUpgrades(tabName);
        }
    }

    // Centralized level thresholds (used for progression & progress bar)
    getLevelThresholds() {
        return [
            0, 100, 500, 2000, 10000, 50000, 250000, 1000000, 5000000, 25000000,
            100000000, 500000000, 2500000000, 12500000000, 62500000000,
            312500000000, 1562500000000, 7812500000000, 39062500000000, 195312500000000,
            976562500000000, 4882812500000000, 24414062500000000, 122070312500000000,
            610351562500000000, 3051757812500000000, 15258789062500000000,
            76293945312500000000, 381469726562500000000, 1907348632812500000000,
            9536743164062500000000, 47683715820312500000000, 238418579101562500000000
        ];
    }

    updateLevelProgress() {
        const thresholds = this.getLevelThresholds();
        const currentLevel = Math.max(0, Math.min(this.gameState.illuminationLevel, thresholds.length - 1));
        const currentThreshold = thresholds[currentLevel];
        const nextThreshold = thresholds[Math.min(currentLevel + 1, thresholds.length - 1)];
        const progressEl = document.getElementById('level-progress-fill');
        const progressText = document.getElementById('level-progress-text');

        if (!progressEl || !progressText) return;

        let pct = 0;
        if (nextThreshold > currentThreshold) {
            const gainedSince = this.gameState.totalHashEarned - currentThreshold;
            const span = nextThreshold - currentThreshold;
            pct = Math.max(0, Math.min(100, (gainedSince / span) * 100));
        }

        progressEl.style.width = `${pct}%`;
        progressText.textContent = `${Math.floor(pct)}%`;
    }

    // Render upgrades for a category
    renderUpgrades(category) {
        const container = document.getElementById(`${category}-upgrades`);
        container.innerHTML = '';

        this.upgrades[category].forEach(upgrade => {
            if (upgrade.unlockLevel <= this.gameState.illuminationLevel) {
                const upgradeElement = this.createUpgradeElement(upgrade, category);
                container.appendChild(upgradeElement);
            }
        });
    }

    // Create upgrade element
    createUpgradeElement(upgrade, category) {
        const div = document.createElement('div');
        div.className = 'upgrade-item';
        
        const cost = this.getUpgradeCost(upgrade);
        const affordable = this.gameState.hashUnits >= cost;
        
        if (affordable) div.classList.add('affordable');
        if (upgrade.owned > 0) div.classList.add('owned');

        div.innerHTML = `
            <div class="upgrade-name">${upgrade.name} ${upgrade.owned > 0 ? `(${upgrade.owned})` : ''}</div>
            <div class="upgrade-description">${upgrade.description}</div>
            <div class="upgrade-cost">Cost: ${this.formatNumber(cost)} HU</div>
            ${upgrade.baseProduction ? `<div class="upgrade-production">+${this.formatNumber(upgrade.baseProduction)} HU/sec</div>` : ''}
        `;

        div.addEventListener('click', () => {
            if (affordable) {
                this.purchaseUpgrade(upgrade.id, category);
                this.renderUpgrades(category);
            }
        });

        return div;
    }

    // Game loop for passive income
    startGameLoop() {
        // Continuous render / simulation loop using requestAnimationFrame
        this.displayedHashUnits = this.gameState.hashUnits;
        this.displayedHuPerSec = this.gameState.hashPerSecond * this.gameState.globalMultiplier;
        this._lastFrameTime = performance.now();

        const loop = (now) => {
            const dt = Math.max(0, (now - this._lastFrameTime) / 1000); // seconds
            this._lastFrameTime = now;

            // Apply continuous passive income (proportional to delta time)
            if (this.gameState.hashPerSecond > 0) {
                const income = this.gameState.hashPerSecond * this.gameState.globalMultiplier * dt;
                this.gameState.hashUnits += income;
                this.gameState.totalHashEarned += income;
                // Show subtle burst when income is noticeable
                if (income >= 1) this.showIncomeBurst(income);
            }

            // Smoothly animate displayed values towards true values
            const lerpFactor = Math.min(1, dt * 8); // responsiveness
            this.displayedHashUnits += (this.gameState.hashUnits - this.displayedHashUnits) * lerpFactor;
            const trueHuPerSec = this.gameState.hashPerSecond * this.gameState.globalMultiplier;
            this.displayedHuPerSec += (trueHuPerSec - this.displayedHuPerSec) * lerpFactor;

            // Update UI
            this.updateDisplay();

            // Throttled analytics update (once per second approx)
            if (!this._analyticsAccum) this._analyticsAccum = 0;
            this._analyticsAccum += dt;
            if (this._analyticsAccum >= 1) {
                this.updateAnalytics();
                this._analyticsAccum = 0;
            }

            requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);

        // Auto-save every 30 seconds (kept as interval)
        setInterval(() => {
            this.saveGame();
        }, 30000);
    }

    // Analytics tracking
    trackClick() {
        const now = Date.now();
        this.clickTimestamps.push(now);
        // keep last 5s of timestamps
        const cutoff = now - 5000;
        while (this.clickTimestamps.length && this.clickTimestamps[0] < cutoff) {
            this.clickTimestamps.shift();
        }

        // keep analytics counters bounded
        this.analytics.sessionData.clicksPerMinute++;
    }

    updateAnalytics() {
        // Update analytics terminal
        const terminal = document.getElementById('analytics-terminal');
        const lines = [
            `> Hash flow rate: ${this.formatNumber(this.gameState.hashPerSecond)}/sec`,
            `> Global efficiency: ${(this.gameState.globalMultiplier * 100).toFixed(1)}%`,
            `> Network nodes: ${this.getTotalUpgrades()}`,
            `> Risk assessment: ${this.calculateRiskLevel()}`,
            `> Market penetration: ${this.calculateMarketPenetration()}%`,
            `> Operational security: OPTIMAL`
        ];

        terminal.innerHTML = lines.map(line => `<div class="terminal-line">${line}</div>`).join('');

        // Compute CPS (clicks in last 1s)
        const now = Date.now();
        const cpsWindow = now - 1000;
        const cps = this.clickTimestamps.filter(t => t >= cpsWindow).length;

        // Smooth displayed CPS for nicer UX
        this.displayedCPS = (this.displayedCPS || 0) + (cps - (this.displayedCPS || 0)) * 0.35;
        const cpsEl = document.getElementById('clicks-per-second');
        if (cpsEl) cpsEl.textContent = Math.round(this.displayedCPS).toString();

        // Trim analytics arrays to avoid unbounded growth
        const maxEntries = 200;
        ['playerChoices','upgradePatterns','eventResponses'].forEach(key => {
            if (this.analytics[key] && this.analytics[key].length > maxEntries) {
                this.analytics[key] = this.analytics[key].slice(-maxEntries);
            }
        });
    }

    // Flush aggregated click buffer and show visual burst
    flushClickBuffer() {
        if (!this.clickBuffer || this.clickBuffer.count === 0) return;
        const total = this.clickBuffer.value;
        // show aggregated floating number
        this.showClickBurst(total);

        // reset buffer
        clearTimeout(this.clickBuffer.timer);
        this.clickBuffer.count = 0;
        this.clickBuffer.value = 0;
        this.clickBuffer.timer = null;
    }

    showClickBurst(amount) {
        const plant = document.getElementById('hashish-plant');
        const counter = document.getElementById('click-counter');
        if (!plant || !counter) return;

        // Use click-counter for burst text
        counter.textContent = `+${this.formatNumber(amount)}`;
        counter.style.opacity = '1';
        counter.style.transform = 'translateX(-50%) translateY(-10px) scale(1.05)';

        setTimeout(() => {
            counter.style.opacity = '0';
            counter.style.transform = 'translateX(-50%) translateY(0) scale(1)';
        }, 600);
    }

    getTotalUpgrades() {
        return Object.values(this.upgrades).reduce((total, category) => {
            return total + category.reduce((sum, upgrade) => sum + upgrade.owned, 0);
        }, 0);
    }

    calculateRiskLevel() {
        const level = this.gameState.illuminationLevel;
        if (level < 5) return 'LOW';
        if (level < 15) return 'MODERATE';
        if (level < 25) return 'HIGH';
        return 'EXTREME';
    }

    calculateMarketPenetration() {
        return Math.min(95, Math.floor(this.gameState.illuminationLevel * 3.5));
    }

    // Add to operations log
    addToLog(message) {
        const log = document.getElementById('events-log');
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item fade-in-up';
        eventItem.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
        
        log.insertBefore(eventItem, log.firstChild);
        
        // Keep only last 10 events
        while (log.children.length > 10) {
            log.removeChild(log.lastChild);
        }
    }

    addToAnalytics(message) {
        const terminal = document.getElementById('analytics-terminal');
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.textContent = `> ${message}`;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
    }

    // Visual floating income burst (subtle feedback)
    showIncomeBurst(amount) {
        const plant = document.getElementById('hashish-plant');
        if (!plant) return;

        const burst = document.createElement('div');
        burst.className = 'income-burst';
        burst.textContent = `+${Math.round(amount)}`;
        burst.style.position = 'absolute';
        burst.style.left = '50%';
        burst.style.top = '10%';
        burst.style.transform = 'translateX(-50%)';
        burst.style.color = '#ffff00';
        burst.style.fontWeight = 'bold';
        burst.style.pointerEvents = 'none';
        burst.style.opacity = '1';
        burst.style.transition = 'transform 800ms ease-out, opacity 800ms ease-out';

        plant.appendChild(burst);

        requestAnimationFrame(() => {
            burst.style.transform = 'translateX(-50%) translateY(-60px) scale(1.1)';
            burst.style.opacity = '0';
        });

        setTimeout(() => {
            if (burst && burst.parentNode) burst.parentNode.removeChild(burst);
        }, 900);
    }

    // Update all display elements
    updateDisplay() {
        // Use interpolated displayed values for smoother visual feedback
        const displayedHU = typeof this.displayedHashUnits === 'number' ? this.displayedHashUnits : this.gameState.hashUnits;
        const displayedHUPS = typeof this.displayedHuPerSec === 'number' ? this.displayedHuPerSec : (this.gameState.hashPerSecond * this.gameState.globalMultiplier);

        document.getElementById('hash-units').textContent = this.formatNumber(displayedHU);
        document.getElementById('hu-per-sec').textContent = this.formatNumber(displayedHUPS);
        document.getElementById('current-level').textContent = this.gameState.illuminationLevel;
        document.getElementById('prestige-level').textContent = this.gameState.prestigeLevel;
        document.getElementById('enlightenment-tokens').textContent = this.gameState.enlightenmentTokens;
        document.getElementById('global-multiplier').textContent = `${this.gameState.globalMultiplier.toFixed(2)}x`;

        // Update prestige button
        const prestigeBtn = document.getElementById('prestige-btn');
        prestigeBtn.disabled = this.gameState.illuminationLevel < 10;

        // Update level progress bar
        this.updateLevelProgress();
    }

    // Number formatting
    formatNumber(num) {
        if (isNaN(num) || num === 0) return '0';
        if (num < 1000) {
            // Show one decimal for small continuous values for visual feedback
            return (Math.floor(num * 10) / 10).toFixed(num < 1 ? 2 : 1).replace(/\.0+$/, '');
        }
        if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
        if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
        if (num < 1000000000000) return (num / 1000000000).toFixed(1) + 'B';
        return (num / 1000000000000).toFixed(1) + 'T';
    }

    // Save/Load system
    saveGame() {
        const saveData = {
            gameState: this.gameState,
            upgrades: this.upgrades,
            analytics: this.analytics,
            timestamp: Date.now()
        };
        
        localStorage.setItem('hashish_empire_save', JSON.stringify(saveData));
        this.addToLog('Game saved successfully');
    }

    loadGame() {
        const saveData = localStorage.getItem('hashish_empire_save');
        if (saveData) {
            try {
                const data = JSON.parse(saveData);
                this.gameState = { ...this.gameState, ...data.gameState };
                this.upgrades = data.upgrades || this.upgrades;
                this.analytics = data.analytics || this.analytics;

                // Sanitize loaded data to prevent NaN/null issues from corrupted saves
                const sanitize = (val, def) => isNaN(val) || val === null || val === undefined ? def : val;
                this.gameState.hashUnits = sanitize(this.gameState.hashUnits, 0);
                this.gameState.hashPerSecond = sanitize(this.gameState.hashPerSecond, 0);
                this.gameState.clickPower = sanitize(this.gameState.clickPower, 1);
                this.gameState.globalMultiplier = sanitize(this.gameState.globalMultiplier, 1.0);
                this.gameState.illuminationLevel = Math.floor(sanitize(this.gameState.illuminationLevel, 1));
                this.gameState.prestigeLevel = Math.floor(sanitize(this.gameState.prestigeLevel, 0));
                this.gameState.enlightenmentTokens = sanitize(this.gameState.enlightenmentTokens, 0);
                this.gameState.totalClicks = sanitize(this.gameState.totalClicks, 0);
                this.gameState.totalHashEarned = sanitize(this.gameState.totalHashEarned, 0);
                this.gameState.gameStartTime = sanitize(this.gameState.gameStartTime, Date.now());
                this.gameState.lastSave = sanitize(this.gameState.lastSave, Date.now());

                // Sanitize upgrades owned counts
                Object.values(this.upgrades).forEach(category => {
                    category.forEach(upgrade => {
                        upgrade.owned = Math.max(0, Math.floor(sanitize(upgrade.owned, 0)));
                    });
                });
                
                this.updateDisplay();
                this.updateTierDisplay();
                this.addToLog('Game loaded successfully');
            } catch (e) {
                this.addToLog('Failed to load save data');
            }
        }
    }


    resetGame() {
        if (confirm('Are you sure you want to reset all progress?')) {
            localStorage.removeItem('hashish_empire_save');
            location.reload();
        }
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.game = new HashishEmpire();
    
    // Initial tab setup
    window.game.switchTab('production');
    
    console.log('🌿 Hashish Empire: The Illumination Clicker initialized');
    console.log('📊 Analytics tracking active for Oriental Group insights');
});

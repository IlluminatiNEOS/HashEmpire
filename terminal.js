// PROJECT ORIENTAL: Terminal Command System
// Advanced command interface for The Sovereign Supply-Chain Simulation

class TerminalSystem {
    constructor(game) {
        this.game = game;
        this.commandHistory = [];
        this.currentDirectory = '/empire';
        this.isAuthenticated = false;
        this.accessLevel = 'OBSERVER';
        this.initializeTerminal();
    }

    initializeTerminal() {
        // Create terminal interface
        const title = this.game.config.terminalTitle || 'COMMAND INTERFACE';
        
        const terminalContainer = document.createElement('div');
        terminalContainer.id = 'terminal-interface';
        terminalContainer.className = 'terminal-container hidden';
        terminalContainer.innerHTML = `
            <div class="terminal-header">
                <span class="terminal-title">👁️ ${title}</span>
                <span class="terminal-status">STATUS: LIVE_OPERATION | SECURITY: AES-256</span>
                <button class="terminal-close" onclick="window.terminal.toggleTerminal()">×</button>
            </div>
            <div class="terminal-output" id="terminal-output">
                <div class="terminal-line">👁️ SYSTEM: ${title}</div>
                <div class="terminal-line">STATUS: LIVE_OPERATION | REGION: POLAND-MOROCCO-HUB</div>
                <div class="terminal-line">SECURITY: AES-256 ENCRYPTED</div>
                <div class="terminal-line">---</div>
                <div class="terminal-line">Type 'help' for available commands</div>
                <div class="terminal-line">Type 'authenticate' to unlock advanced features</div>
            </div>
            <div class="terminal-input-container">
                <span class="terminal-prompt">${this.currentDirectory}$ </span>
                <input type="text" id="terminal-input" class="terminal-input" autocomplete="off">
            </div>
        `;

        document.body.appendChild(terminalContainer);
        this.setupEventListeners();
        this.addTerminalStyles();
    }

    addTerminalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .terminal-container {
                position: fixed;
                top: 10%;
                left: 10%;
                width: 80%;
                height: 70%;
                background: rgba(0, 0, 0, 0.95);
                border: 2px solid #00ff00;
                border-radius: 10px;
                z-index: 3000;
                font-family: 'VT323', monospace;
                display: flex;
                flex-direction: column;
            }

            .terminal-header {
                background: rgba(0, 255, 0, 0.1);
                padding: 10px;
                border-bottom: 1px solid #00ff00;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .terminal-title {
                color: #ffff00;
                font-weight: bold;
            }

            .terminal-status {
                color: #00ff00;
                font-size: 0.9rem;
            }

            .terminal-close {
                background: none;
                border: 1px solid #ff6600;
                color: #ff6600;
                padding: 5px 10px;
                cursor: pointer;
                font-family: 'VT323', monospace;
            }

            .terminal-output {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                color: #00ff00;
            }

            .terminal-line {
                margin-bottom: 5px;
                word-wrap: break-word;
            }

            .terminal-input-container {
                padding: 10px 15px;
                border-top: 1px solid #00ff00;
                display: flex;
                align-items: center;
            }

            .terminal-prompt {
                color: #ffff00;
                margin-right: 10px;
            }

            .terminal-input {
                flex: 1;
                background: transparent;
                border: none;
                color: #00ff00;
                font-family: 'VT323', monospace;
                font-size: 1rem;
                outline: none;
            }

            .terminal-error {
                color: #ff6600;
            }

            .terminal-success {
                color: #ffff00;
            }

            .terminal-data {
                color: #00ffff;
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        const input = document.getElementById('terminal-input');
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand(input.value);
                input.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (this.commandHistory.length > 0) {
                    input.value = this.commandHistory[this.commandHistory.length - 1];
                }
            }
        });

        // Global hotkey to open terminal (Ctrl + `)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === '`') {
                e.preventDefault();
                this.toggleTerminal();
            }
        });
    }

    toggleTerminal() {
        const terminal = document.getElementById('terminal-interface');
        terminal.classList.toggle('hidden');
        if (!terminal.classList.contains('hidden')) {
            document.getElementById('terminal-input').focus();
        }
    }

    executeCommand(command) {
        this.commandHistory.push(command);
        this.addOutput(`${this.currentDirectory}$ ${command}`);

        const args = command.trim().split(' ');
        const cmd = args[0].toLowerCase();

        switch (cmd) {
            case 'help':
                this.showHelp();
                break;
            case 'authenticate':
                this.authenticate(args[1]);
                break;
            case 'status':
                this.showStatus();
                break;
            case 'fleet':
                this.showFleet();
                break;
            case 'routes':
                this.showRoutes();
                break;
            case 'analytics':
                this.showAnalytics();
                break;
            case 'export':
                this.exportData(args[1]);
                break;
            case 'hack':
                this.hackCommand(args.slice(1));
                break;
            case 'ls':
                this.listDirectory();
                break;
            case 'cd':
                this.changeDirectory(args[1]);
                break;
            case 'cat':
                this.showFile(args[1]);
                break;
            case 'clear':
                this.clearTerminal();
                break;
            case 'matrix':
                this.matrixEffect();
                break;
            case 'illuminate':
                this.illuminateCommand(args.slice(1));
                break;
            case 'achievements':
                this.showAchievements();
                break;
            case 'unlock':
                this.unlockAchievement(args[1]);
                break;
            default:
                this.addOutput(`Command not found: ${cmd}`, 'terminal-error');
                this.addOutput('Type "help" for available commands');
        }
    }

    showHelp() {
        const commands = [
            'AVAILABLE COMMANDS:',
            '==================',
            'help          - Show this help message',
            'authenticate  - Authenticate with access key',
            'status        - Show system status',
            'fleet         - Display fleet information',
            'routes        - Show active routes',
            'analytics     - Display analytics data',
            'export [type] - Export data (json, csv)',
            'hack [target] - Advanced operations (requires auth)',
            'ls            - List directory contents',
            'cd [dir]      - Change directory',
            'cat [file]    - Display file contents',
            'clear         - Clear terminal',
            'matrix        - Enter the matrix',
            'illuminate    - Advanced illumination commands',
            'achievements  - Show achievement progress',
            'unlock [id]   - Unlock specific achievement (debug)',
            '',
            'HOTKEYS:',
            'Ctrl + `      - Toggle terminal',
            'Arrow Up      - Previous command'
        ];
        
        commands.forEach(cmd => this.addOutput(cmd));
    }

    authenticate(key) {
        const validKeys = {
            'OBSERVER': 'Basic access level',
            'HARDWARE': 'Hardware dongle access',
            'ORACLE': 'API access level',
            'GOVERNOR': 'Regional governor access',
            'ARCHITECT': 'Grand architect access'
        };

        if (key && validKeys[key.toUpperCase()]) {
            this.isAuthenticated = true;
            this.accessLevel = key.toUpperCase();
            this.addOutput(`Authentication successful: ${validKeys[key.toUpperCase()]}`, 'terminal-success');
            this.addOutput('Advanced commands unlocked');
        } else {
            this.addOutput('Authentication failed. Valid keys: OBSERVER, HARDWARE, ORACLE, GOVERNOR, ARCHITECT', 'terminal-error');
        }
    }

    showStatus() {
        const status = [
            '👁️ SYSTEM STATUS',
            '================',
            `Access Level: ${this.accessLevel}`,
            `Hash Units: ${this.game.formatNumber(this.game.gameState.hashUnits)}`,
            `Production Rate: ${this.game.formatNumber(this.game.gameState.hashPerSecond)}/sec`,
            `Illumination Level: ${this.game.gameState.illuminationLevel}`,
            `Global Multiplier: ${this.game.gameState.globalMultiplier.toFixed(2)}x`,
            `Network Nodes: ${this.game.getTotalUpgrades()}`,
            `Risk Level: ${this.game.calculateRiskLevel()}`,
            `Market Penetration: ${this.game.calculateMarketPenetration()}%`,
            `Uptime: ${Math.floor((Date.now() - this.game.gameState.gameStartTime) / 1000)}s`
        ];
        
        status.forEach(line => this.addOutput(line, 'terminal-data'));
    }

    showFleet() {
        if (!this.isAuthenticated) {
            this.addOutput('Access denied. Authentication required.', 'terminal-error');
            return;
        }

        const fleet = [
            '🚢 FLEET STATUS',
            '===============',
            'Route: Tangier → Poznań',
            'Active Vessels: 3',
            'Cargo Capacity: 15,000 units',
            'ETA Next Delivery: 2h 34m',
            'Security Level: ENCRYPTED',
            '',
            'VESSEL MANIFEST:',
            '- MV Oriental Pride (Cargo: 5,200 units)',
            '- MV Hash Runner (Cargo: 4,800 units)', 
            '- MV Silent Trader (Cargo: 5,000 units)'
        ];
        
        fleet.forEach(line => this.addOutput(line, 'terminal-data'));
    }

    showRoutes() {
        const routes = [
            '🗺️ ACTIVE ROUTES',
            '================',
            'PRIMARY: Morocco → Poland (Active)',
            'SECONDARY: Amsterdam → Berlin (Standby)',
            'TERTIARY: Barcelona → Marseille (Planning)',
            '',
            'EFFICIENCY METRICS:',
            `Route Optimization: ${85 + Math.floor(Math.random() * 15)}%`,
            `Customs Clearance: ${90 + Math.floor(Math.random() * 10)}%`,
            `Delivery Success Rate: ${95 + Math.floor(Math.random() * 5)}%`
        ];
        
        routes.forEach(line => this.addOutput(line, 'terminal-data'));
    }

    showAnalytics() {
        const analytics = this.game.analytics;
        const data = [
            '📊 ANALYTICS DASHBOARD',
            '=====================',
            `Total Clicks: ${this.game.gameState.totalClicks}`,
            `Player Choices Made: ${analytics.playerChoices.length}`,
            `Upgrade Patterns: ${analytics.upgradePatterns.length}`,
            `Event Responses: ${analytics.eventResponses.length}`,
            `Session Duration: ${Math.floor((Date.now() - analytics.sessionData.startTime) / 60000)}m`,
            '',
            'BEHAVIORAL INSIGHTS:',
            '- Risk Tolerance: ' + (analytics.playerChoices.filter(c => c.path === 'underground').length > analytics.playerChoices.filter(c => c.path === 'semi_legal').length ? 'HIGH' : 'MODERATE'),
            '- Upgrade Strategy: ' + (analytics.upgradePatterns.length > 0 ? 'AGGRESSIVE' : 'CONSERVATIVE'),
            '- Decision Speed: ' + (analytics.eventResponses.length > 5 ? 'FAST' : 'DELIBERATE')
        ];
        
        data.forEach(line => this.addOutput(line, 'terminal-data'));
    }

    exportData(type = 'json') {
        if (!this.isAuthenticated || this.accessLevel === 'OBSERVER') {
            this.addOutput('Access denied. Higher authentication required.', 'terminal-error');
            return;
        }

        const data = {
            gameState: this.game.gameState,
            analytics: this.game.analytics,
            timestamp: new Date().toISOString(),
            exportType: type
        };

        if (type === 'csv') {
            // Convert to CSV format
            const csv = this.convertToCSV(data);
            this.downloadFile('oriental_analytics.csv', csv, 'text/csv');
        } else {
            // Default JSON export
            const json = JSON.stringify(data, null, 2);
            this.downloadFile('oriental_analytics.json', json, 'application/json');
        }

        this.addOutput(`Data exported as ${type.toUpperCase()}`, 'terminal-success');
    }

    convertToCSV(data) {
        const rows = [
            ['Metric', 'Value'],
            ['Hash Units', data.gameState.hashUnits],
            ['Illumination Level', data.gameState.illuminationLevel],
            ['Total Clicks', data.gameState.totalClicks],
            ['Global Multiplier', data.gameState.globalMultiplier],
            ['Player Choices', data.analytics.playerChoices.length],
            ['Upgrade Patterns', data.analytics.upgradePatterns.length],
            ['Event Responses', data.analytics.eventResponses.length]
        ];
        
        return rows.map(row => row.join(',')).join('\n');
    }

    downloadFile(filename, content, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    hackCommand(args) {
        if (!this.isAuthenticated || this.accessLevel === 'OBSERVER') {
            this.addOutput('Access denied. Advanced authentication required.', 'terminal-error');
            return;
        }

        const target = args[0];
        switch (target) {
            case 'multiplier':
                this.game.gameState.globalMultiplier *= 1.1;
                this.addOutput('Global multiplier hacked: +10%', 'terminal-success');
                break;
            case 'units':
                this.game.gameState.hashUnits *= 2;
                this.addOutput('Hash units doubled', 'terminal-success');
                break;
            case 'level':
                this.game.gameState.illuminationLevel += 1;
                this.game.updateTierDisplay();
                this.addOutput('Illumination level increased', 'terminal-success');
                break;
            default:
                this.addOutput('Invalid hack target. Available: multiplier, units, level', 'terminal-error');
        }
        
        this.game.updateDisplay();
    }

    listDirectory() {
        const files = {
            '/empire': ['analytics.db', 'fleet.log', 'routes.map', 'secrets.enc'],
            '/morocco': ['tangier_port.dat', 'supply_chain.json'],
            '/poland': ['poznan_hub.cfg', 'distribution.log'],
            '/system': ['auth.key', 'neural_net.ai', 'reality_bridge.exe']
        };

        const currentFiles = files[this.currentDirectory] || ['Permission denied'];
        currentFiles.forEach(file => this.addOutput(file));
    }

    changeDirectory(dir) {
        const validDirs = ['/empire', '/morocco', '/poland', '/system'];
        if (dir && validDirs.includes(dir)) {
            this.currentDirectory = dir;
            this.addOutput(`Changed directory to ${dir}`, 'terminal-success');
        } else {
            this.addOutput('Directory not found', 'terminal-error');
        }
    }

    showFile(filename) {
        const files = {
            'secrets.enc': '👁️ [ENCRYPTED] Access level insufficient',
            'analytics.db': 'Player behavior patterns detected...',
            'fleet.log': 'Last shipment: 15,000 units delivered successfully',
            'auth.key': this.isAuthenticated ? 'Authentication: VALID' : '[ENCRYPTED]'
        };

        const content = files[filename] || 'File not found';
        this.addOutput(content, content.includes('[ENCRYPTED]') ? 'terminal-error' : 'terminal-data');
    }

    clearTerminal() {
        document.getElementById('terminal-output').innerHTML = '';
    }

    matrixEffect() {
        this.addOutput('Entering the matrix...', 'terminal-success');
        
        // Add matrix rain effect
        const chars = '01👁️🌿💎⬛';
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const line = Array(50).fill().map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
                this.addOutput(line, 'terminal-data');
            }, i * 100);
        }
        
        setTimeout(() => {
            this.addOutput('Welcome to the real world, Neo.', 'terminal-success');
        }, 2500);
    }

    illuminateCommand(args) {
        if (this.accessLevel !== 'ARCHITECT') {
            this.addOutput('Access denied. Grand Architect level required.', 'terminal-error');
            return;
        }

        const command = args[0];
        switch (command) {
            case 'all':
                this.addOutput('👁️ ILLUMINATING ALL SYSTEMS...', 'terminal-success');
                this.game.gameState.illuminationLevel = 33;
                this.game.gameState.globalMultiplier *= 10;
                this.game.updateTierDisplay();
                this.game.updateDisplay();
                this.addOutput('ILLUMINATION COMPLETE. YOU ARE THE ARCHITECT.', 'terminal-success');
                break;
            case 'reality':
                this.addOutput('🌍 BRIDGING TO REALITY...', 'terminal-success');
                this.addOutput('GPS Coordinates unlocked: 52.4064° N, 16.9252° E', 'terminal-data');
                this.addOutput('Physical cache location revealed in Poznań', 'terminal-data');
                break;
            default:
                this.addOutput('Available illumination commands: all, reality', 'terminal-data');
        }
    }

    showAchievements() {
        if (!window.achievements) {
            this.addOutput('Achievement system not loaded', 'terminal-error');
            return;
        }

        const stats = window.achievements.getStats();
        const progress = stats.progress;
        
        const achievementData = [
            '🏆 ACHIEVEMENT PROGRESS',
            '======================',
            `Total Progress: ${progress.unlocked}/${progress.total} (${progress.percentage}%)`,
            '',
            'TIER BREAKDOWN:',
            '---------------'
        ];

        Object.entries(stats.tierCounts).forEach(([tier, counts]) => {
            const percentage = Math.round((counts.unlocked / counts.total) * 100);
            achievementData.push(`${tier.toUpperCase()}: ${counts.unlocked}/${counts.total} (${percentage}%)`);
        });

        achievementData.push('');
        achievementData.push('RECENT ACHIEVEMENTS:');
        achievementData.push('-------------------');

        if (stats.recentAchievements.length > 0) {
            stats.recentAchievements.forEach(id => {
                const achievement = window.achievements.achievements.find(a => a.id === id);
                if (achievement) {
                    achievementData.push(`${achievement.icon} ${achievement.name}`);
                }
            });
        } else {
            achievementData.push('No achievements unlocked yet');
        }

        achievementData.forEach(line => this.addOutput(line, 'terminal-data'));
    }

    unlockAchievement(achievementId) {
        if (!this.isAuthenticated || this.accessLevel === 'OBSERVER') {
            this.addOutput('Access denied. Higher authentication required.', 'terminal-error');
            return;
        }

        if (!window.achievements) {
            this.addOutput('Achievement system not loaded', 'terminal-error');
            return;
        }

        if (!achievementId) {
            this.addOutput('Usage: unlock [achievement_id]', 'terminal-error');
            this.addOutput('Available IDs: first_click, hundred_clicks, first_upgrade, etc.', 'terminal-data');
            return;
        }

        const achievement = window.achievements.achievements.find(a => a.id === achievementId);
        if (!achievement) {
            this.addOutput(`Achievement not found: ${achievementId}`, 'terminal-error');
            return;
        }

        if (window.achievements.unlockedAchievements.has(achievementId)) {
            this.addOutput(`Achievement already unlocked: ${achievement.name}`, 'terminal-error');
            return;
        }

        window.achievements.unlockAchievementById(achievementId);
        this.addOutput(`Achievement unlocked: ${achievement.icon} ${achievement.name}`, 'terminal-success');
    }

    addOutput(text, className = 'terminal-line') {
        const output = document.getElementById('terminal-output');
        const line = document.createElement('div');
        line.className = className;
        line.textContent = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }
}

// Initialize terminal when game loads
const initTerminal = () => {
    if (window.game && !window.terminal) {
        window.terminal = new TerminalSystem(window.game);
    }
};

if (window.game) {
    initTerminal();
} else {
    window.addEventListener('game-ready', initTerminal);
}

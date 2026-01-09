window.EMPIRE_DATA = {
    syndicate: {
        meta: {
            name: "The Syndicate",
            description: "Classic Operations. High Risk, High Reward. Dominate the underground.",
            criteria: { speed: 9, stability: 3, efficiency: 6, harmony: 1 },
            theme: "oriental",
            icon: "👁️"
        },
        config: {
            currencyName: "Hash Units",
            currencySymbol: "HU",
            resourceName: "Hash",
            terminalTitle: "ORIENTAL COMMAND INTERFACE",
            tiers: [
                { name: 'Street-Level Operations', role: 'Street Dealer' },
                { name: 'Production & Local Commerce', role: 'Local Entrepreneur' },
                { name: 'Regional Expansion', role: 'Regional Coordinator' },
                { name: 'National Influence', role: 'Media Manipulator' },
                { name: 'Global Power', role: 'Shadow Diplomat' },
                { name: 'The Illumination', role: 'Grand Architect' }
            ]
        },
        upgrades: {
            production: [
                { id: 'young_dealer', name: '🏃 The Young Dealer', description: 'Street kid with a cyber-leg.', cost: 15, baseProduction: 0.1, unlockLevel: 1 },
                { id: 'street_corner', name: '🏪 Street Corner Stand', description: 'Prime real estate.', cost: 100, baseProduction: 1, unlockLevel: 2 },
                { id: 'local_network', name: '🌐 Local Network', description: 'Word of mouth.', cost: 500, baseProduction: 5, unlockLevel: 3 },
                { id: 'bicycle_delivery', name: '🚲 Bicycle Delivery', description: 'Silent distribution.', cost: 2000, baseProduction: 20, unlockLevel: 4 },
                { id: 'hashish_bakery', name: '🍪 Hashish Bakery', description: 'Special cakes.', cost: 10000, baseProduction: 100, unlockLevel: 6 },
                { id: 'coffee_shop', name: '☕ Coffee Shop Front', description: 'Perfect cover.', cost: 25000, baseProduction: 250, unlockLevel: 7 },
                { id: 'dispensary', name: '🌿 Discreet Dispensary', description: 'Medical license.', cost: 75000, baseProduction: 750, unlockLevel: 8 },
                { id: 'urban_grow', name: '🏙️ Urban Grow-Op', description: 'Vertical farming.', cost: 200000, baseProduction: 2000, unlockLevel: 9 },
                { id: 'courier_network', name: '🚚 Courier Network', description: 'Professional logistics.', cost: 500000, baseProduction: 5000, unlockLevel: 11 },
                { id: 'hidden_warehouses', name: '📦 Hidden Warehouses', description: 'Storage in plain sight.', cost: 1500000, baseProduction: 15000, unlockLevel: 12 },
                { id: 'port_connections', name: '🚢 Port Connections', description: 'Morocco to Europe.', cost: 5000000, baseProduction: 50000, unlockLevel: 13, specialEffect: 'morocco_connection' },
                { id: 'poznan_hub', name: '🇵🇱 The Poznań Hub', description: 'Central distribution.', cost: 15000000, baseProduction: 150000, unlockLevel: 14, specialEffect: 'poland_connection' }
            ],
            distribution: [
                { id: 'encrypted_comms', name: '🔒 Encrypted Comms', description: 'Secure channels.', cost: 1000, effect: 'click_multiplier', value: 1.5, unlockLevel: 3 },
                { id: 'supply_chain', name: '⛓️ Supply Chain Opt.', description: 'Efficiency tech.', cost: 50000, effect: 'production_multiplier', value: 1.25, unlockLevel: 8 },
                { id: 'dark_web_market', name: '🕸️ Dark Web Market', description: 'Digital expansion.', cost: 500000, effect: 'global_multiplier', value: 1.5, unlockLevel: 12 }
            ],
            influence: [
                { id: 'local_politician', name: '🤝 Local Politician', description: 'Friend in city hall.', cost: 100000, effect: 'risk_reduction', value: 0.1, unlockLevel: 10 },
                { id: 'media_influence', name: '📰 Media Influence', description: 'Shaping opinion.', cost: 1000000, effect: 'prestige_bonus', value: 1.2, unlockLevel: 15 },
                { id: 'think_tank', name: '🏛️ Think Tank', description: 'Academic legitimacy.', cost: 10000000, effect: 'enlightenment_bonus', value: 2, unlockLevel: 20 }
            ]
        },
        achievements: [
            { id: 'first_click', name: 'The First Seed', description: 'Click 1 time', type: 'clicks', threshold: 1, reward: { type: 'multiplier', value: 1.1 }, icon: '🌱' },
            { id: 'million_hash', name: 'Hash Millionaire', description: 'Earn 1M HU', type: 'currency', threshold: 1000000, reward: { type: 'multiplier', value: 1.25 }, icon: '💎' }
        ]
    },

    nexus: {
        meta: {
            name: "Nexus Corp",
            description: "Efficiency & Scale. Build a tech monopoly.",
            criteria: { speed: 5, stability: 8, efficiency: 10, harmony: 2 },
            theme: "corporate",
            icon: "💠"
        },
        config: {
            currencyName: "Credits",
            currencySymbol: "CR",
            resourceName: "Data",
            terminalTitle: "NEXUS MAINFRAME ACCESS",
            tiers: [
                { name: 'Garage Startup', role: 'Intern' },
                { name: 'Seed Round', role: 'Founder' },
                { name: 'Series A', role: 'CEO' },
                { name: 'IPO', role: 'Tech Mogul' },
                { name: 'Monopoly', role: 'Market Maker' },
                { name: 'Singularity', role: 'AI Overlord' }
            ]
        },
        upgrades: {
            production: [
                { id: 'script_kiddie', name: '📜 Script Kiddie', description: 'Automated tasks.', cost: 20, baseProduction: 0.2, unlockLevel: 1 },
                { id: 'home_server', name: '🖥️ Home Server', description: 'Hosting locally.', cost: 150, baseProduction: 2, unlockLevel: 2 },
                { id: 'cloud_cluster', name: '☁️ Cloud Cluster', description: 'Scalable infra.', cost: 1500, baseProduction: 15, unlockLevel: 5 },
                { id: 'quantum_core', name: '⚛️ Quantum Core', description: 'Reality calc.', cost: 75000, baseProduction: 800, unlockLevel: 10 }
            ],
            distribution: [
                { id: 'fiber_optics', name: '⚡ Fiber Optics', description: 'Low latency.', cost: 800, effect: 'click_multiplier', value: 1.3, unlockLevel: 3 },
                { id: 'the_algorithm', name: '🧠 The Algorithm', description: 'Predictive sales.', cost: 15000, effect: 'global_multiplier', value: 1.4, unlockLevel: 8 }
            ],
            influence: [
                { id: 'tech_lobbying', name: '🏛️ Tech Lobbying', description: 'Deregulation.', cost: 30000, effect: 'risk_reduction', value: 0.5, unlockLevel: 6 }
            ]
        },
        achievements: [
            { id: 'hello_world', name: 'Hello World', description: 'First Click', type: 'clicks', threshold: 1, reward: { type: 'multiplier', value: 1.1 }, icon: '👋' },
            { id: 'unicorn', name: 'Unicorn Status', description: 'Earn 1B CR', type: 'currency', threshold: 1000000000, reward: { type: 'enlightenmentTokens', value: 5 }, icon: '🦄' }
        ]
    },

    verdant: {
        meta: {
            name: "Verdant Flow",
            description: "Harmony & Growth. Restore the balance.",
            criteria: { speed: 3, stability: 10, efficiency: 5, harmony: 10 },
            theme: "solarpunk",
            icon: "🌿"
        },
        config: {
            currencyName: "Life Force",
            currencySymbol: "LF",
            resourceName: "Biomass",
            terminalTitle: "GAIA NETWORK LINK",
            tiers: [
                { name: 'Community Garden', role: 'Gardener' },
                { name: 'Permaculture Farm', role: 'Steward' },
                { name: 'Reforestation Project', role: 'Ranger' },
                { name: 'Planetary Healer', role: 'Druid' },
                { name: 'Biosphere Architect', role: 'Life Weaver' },
                { name: 'Gaia Consciousness', role: 'Keeper' }
            ]
        },
        upgrades: {
            production: [
                { id: 'wild_seeds', name: '🌱 Wild Seeds', description: 'Nature finds a way.', cost: 10, baseProduction: 0.15, unlockLevel: 1 },
                { id: 'bee_hive', name: '🐝 Bee Hive', description: 'Pollination boost.', cost: 80, baseProduction: 1.5, unlockLevel: 2 },
                { id: 'solar_grid', name: '☀️ Solar Grid', description: 'Clean energy.', cost: 1200, baseProduction: 12, unlockLevel: 5 },
                { id: 'terraformer', name: '🌍 Terraformer', description: 'Reclaiming waste.', cost: 60000, baseProduction: 600, unlockLevel: 10 }
            ],
            distribution: [
                { id: 'mycelium', name: '🍄 Mycelium Network', description: 'Underground connections.', cost: 600, effect: 'click_multiplier', value: 1.25, unlockLevel: 3 },
                { id: 'spirit_guides', name: '👻 Spirit Guides', description: 'Ancestral wisdom.', cost: 12000, effect: 'global_multiplier', value: 1.6, unlockLevel: 8 }
            ],
            influence: [
                { id: 'global_harmony', name: '☮️ Global Harmony', description: 'Peace brings prosperity.', cost: 25000, effect: 'risk_reduction', value: 0.8, unlockLevel: 6 }
            ]
        },
        achievements: [
            { id: 'sprout', name: 'First Sprout', description: 'Click 1 time', type: 'clicks', threshold: 1, reward: { type: 'multiplier', value: 1.1 }, icon: '🌱' },
            { id: 'nirvana', name: 'Nirvana', description: 'Reach Level 33', type: 'level', threshold: 33, reward: { type: 'multiplier', value: 3.0 }, icon: '🧘' }
        ]
    }
};
# Hashish Empire: The Illumination Clicker - Complete RPA Platform

## 🌿 Project Overview

**Hashish Empire** is a revolutionary Reality Game Platform (RPA) combining addictive clicker gameplay with sophisticated business intelligence analytics. Built as per the Game Design Document (GDD) and PROJECT ORIENTAL specifications from `instrukcja.ai`.

**Key Features:**
- 33 Illumination Levels across 6 progression tiers
- Advanced terminal interface (Ctrl+`) with fleet management & hacking
- Achievement system with 25+ tiered achievements & notifications
- Comprehensive behavioral analytics & data export (CSV/JSON)
- Retro CRT aesthetic with responsive design
- Reality Bridge: Morocco-Poland supply chain simulation

## 📁 Project Structure

```
HashEmpire/
├── index.html                 # Main game (clicker + analytics)
├── styles.css                 # Retro CRT styling
├── game.js                    # Core game engine
├── terminal.js                # Advanced command interface
├── achievements.js            # Achievement system
├── instrukcja.ai              # PROJECT ORIENTAL specs
├── README.md                  # This file
└── illumination-store/        # Separate merch crowdfunding site
    └── index.html             # Indiegogo-style sales page
```

## 🎮 Game Features

### Core Mechanics
- **Clicking**: Generate Hash Units (HU) - fixed NaN bug
- **Upgrades**: Production, Distribution, Influence trees
- **Prestige**: Permanent bonuses at Level 10+
- **Path Choices**: Risk vs Safety strategic decisions
- **Random Events**: Crisis management scenarios

### Advanced Systems
- **Terminal (Ctrl+`)**: `help`, `fleet`, `routes`, `analytics`, `export`, `hack`, `achievements`
- **Achievements**: 25+ with Bronze-Platinum-Legendary tiers
- **Analytics**: Player behavior, risk tolerance, upgrade patterns

## 🛒 Merchandise Crowdfunding (illumination-store/index.html)
- Indiegogo-style single-page site
- 5 tiers: Observer Node ($33) → Grand Architect ($333,333)
- Modern cyberpunk aesthetic (different branding)
- Responsive, animated, pledge simulation

## 🚀 Deployment & Git Setup

### Local Development
```bash
open index.html          # Launch game
open illumination-store/index.html  # Launch merch site
```

### Git Deployment
```bash
git init
git add .
git commit -m "Initial HashEmpire RPA commit"
gh repo create HashEmpire --public --source=. --remote=origin --push
gh branch -D gh-pages
git subtree push --prefix illumination-store origin gh-pages:illumination-store
```

### GitHub Pages Deploy
1. Create `gh-pages` branch
2. Root `/` → Game (index.html)
3. `/illumination-store/` → Merch site

## 🔧 Technical Stack
- **Frontend**: Vanilla HTML5/CSS3/JS (no frameworks)
- **Storage**: localStorage (save/load)
- **Responsive**: Mobile-first CSS Grid/Flexbox
- **Performance**: Optimized 1s game loop

## 📊 Analytics Output
Data tracked:
- Click patterns & frequency
- Upgrade prioritization
- Risk tolerance (path choices)
- Event response patterns
- Progression strategies

Export via terminal: `authenticate ORACLE` → `export json`

## 🎯 Usage Instructions

1. **Play Game**: Click plant → Buy upgrades → Terminal (Ctrl+`)
2. **Test Terminal**: `help` → `authenticate HARDWARE` → `fleet`
3. **Achievements**: Auto-unlock with notifications
4. **Export Data**: `export csv` for business intelligence
5. **Merch Site**: Separate branding for plausible deniability

## 🧪 Verified Functionality
- ✅ Clicker works (NaN fixed)
- ✅ Terminal commands operational
- ✅ Achievements trigger correctly
- ✅ Save/Load persistent
- ✅ Responsive on mobile
- ✅ Merch page fully functional
- ✅ Git-ready structure

## 📄 License
Educational/research use only. Satirical business simulation.

**🌿 The Eye watches. Your empire awaits. Deploy and illuminate.**

**Last Updated: 2026-01-05**

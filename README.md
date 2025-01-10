# Discord Search Bot 🔍

A powerful Discord bot written in TypeScript that enables advanced message searching capabilities channels.

## ✨ Key Features

- 🔎 Global message search across all channels
- 🏷️ Smart filtering by keywords and message length
- ⚡ Modern slash command interface
- 📝 Type-safe implementation with TypeScript

## 🚀 Quick Start

1. **Clone and Setup**
```bash
git clone https://github.com/mbramani/discord-search-bot
cd discord-search-bot
npm install
```

2. **Configure Environment**
Create `.env` file:
```bash
DISCORD_TOKEN=your_discord_bot_token_here
CLIENT_ID=your_client_id_here
```

## 🛠️ Setup Guide

1. Create new app in [Discord Developer Portal](https://discord.com/developers/applications)
2. Add bot to your application
3. Copy bot token and client ID
4. Use OAuth2 to invite bot to server

## 📋 Usage

```bash
# Build project
npm run build

# Deploy commands
npm run deploy

# Start bot
npm run start

# Development mode
npm run dev
```

## 💻 Available Commands

The bot supports both slash commands and text commands:

### Slash Commands
- `/search <keyword> <limit>` - Search messages by keyword with length filter

### Text Commands
- `!search <keyword> <limit>` - Search messages using text command


## 🔧 Development

```bash
# Start dev mode with hot-reload
npm run dev

# Edit TypeScript files in src/
```

## 🛠️ Technology Stack

- TypeScript
- Discord.js
- Node.js

## 📄 License

[MIT License](LICENSE)



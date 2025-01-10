import { ChatInputCommandInteraction, Client, GatewayIntentBits } from 'discord.js';

import { MessageSearchService } from './services/message-search';
import { config } from './config';

// Create a new Discord client
export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Create a new instance of the message search service
const searchService = new MessageSearchService();

client.once('ready', () => {
  console.log(`Bot logged in as ${client.user?.tag}`);
});

client.on('messageCreate', async (message) => {
  // Ignore messages from bots and DMs
  if (message.author.bot || !message.guild) return;

  // Search command implementation
  if (message.content.startsWith(`${config.PREFIX}search`)) {
    const args = message.content.split(' ').slice(1);
    if (args.length < 2) {
      return message.reply('Usage: !search <word> <limit>');
    }

    const [word, limitStr] = args;
    const limit = parseInt(limitStr);

    // Validate limit
    if (isNaN(limit)) {
      return message.reply('Limit must be a number');
    }

    try {
      // Search messages
      const results = await searchService.searchMessages(message.guild, { word, limit });

      // Handle no results
      if (results.length === 0) {
        return message.reply(`No messages found containing "${word}" with more than ${limit} characters.`);
      }

      // Format and send response
      const response = `Found ${results.length} messages containing "${word}" with more than ${limit} characters:\n\n` +
        results.slice(0, 5).map(r => 
          `- [${r.content.substring(0, 100)}...](https://discord.com/channels/${message.guild?.id}/${r.channelId}/${r.messageId}) (by ${r.author})`
        ).join('\n');

      await message.reply(response);
    } catch (error) {
      console.error('Search error:', error);
      await message.reply('An error occurred while searching messages.');
    }
  }
});

client.on('interactionCreate', async (interaction) => {
  // Ignore non-command interactions
  if (!interaction.isCommand() || !(interaction instanceof ChatInputCommandInteraction)) return;

  // Search command implementation
  if (interaction.commandName === 'search') {
    const keyword = interaction.options.getString('keyword', true);
    const limit = interaction.options.getInteger('limit', true);

    await interaction.deferReply();

    try {
      // Validate that the command is used in a guild
      if (!interaction.guild) {
        await interaction.editReply('This command can only be used in a server.');
        return;
      }

      // Search messages
      const results = await searchService.searchMessages(interaction.guild, { word: keyword, limit });

      // Handle no results
      if (results.length === 0) {
        await interaction.editReply(`No messages found containing "${keyword}" with more than ${limit} characters.`);
      }
      
      // Format and send response
      const response = `Found ${results.length} messages containing "${keyword}" with more than ${limit} characters:\n\n` +
        results.slice(0, 5).map(r => 
          `- [${r.content.substring(0, 100)}...](https://discord.com/channels/${interaction.guild?.id}/${r.channelId}/${r.messageId}) (by ${r.author})`
        ).join('\n');
      
      await interaction.editReply(response);
    } catch (error) {
      console.error('Search error:', error);
      await interaction.editReply('An error occurred while searching messages.');
    }
  }
});

const startBot = async () => {
  try {
    // Login to Discord
    await client.login(config.DISCORD_TOKEN);
    console.log('Bot started successfully');
  } catch (error) {
    console.error('Failed to start bot:', error);
  }
};

startBot();

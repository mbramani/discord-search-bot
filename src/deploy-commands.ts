import { REST, Routes } from 'discord.js';

import { commands } from './commands';
import { config } from './config';

const rest = new REST().setToken(config.DISCORD_TOKEN);

/**
 * Deploys global slash commands to all servers
 */
export async function deployCommands() {
  try {
    console.log('Started deploying global slash commands...');
    console.log('This may take up to an hour to update across all servers.');

    await rest.put(
      Routes.applicationCommands(config.CLIENT_ID),
      { body: commands }
    );

    console.log('Global slash commands deployed successfully');
  } catch (error) {
    console.error('Error deploying commands:', error);
  }
}
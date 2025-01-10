import { ApplicationCommandOptionType } from 'discord.js';

export const commands = [
  {
    name: 'search',
    description: 'Search for messages containing specific words',
    options: [
      {
        name: 'keyword',
        description: 'Word to search for',
        type: ApplicationCommandOptionType.String,
        required: true
      },
      {
        name: 'limit',
        description: 'Minimum message length',
        type: ApplicationCommandOptionType.Integer,
        required: true
      }
    ]
  }
];
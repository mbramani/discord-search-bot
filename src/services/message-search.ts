import { ChannelType, Guild, Message, TextChannel } from 'discord.js';
import { SearchParams, SearchResult } from '../types';

/**
 * Service for searching messages in a guild.
 */
export class MessageSearchService {
    /**
     * Searches messages in a guild for a specific word.
     * @param guild The guild to search in.
     * @param params The search parameters.
     * @returns An array of search results.
     */
    async searchMessages(guild: Guild, params: SearchParams): Promise<SearchResult[]> {
        const results: SearchResult[] = [];
        const channels = guild.channels.cache.filter(c => c.type === ChannelType.GuildText);

        // Search each text channel for messages containing the word
        for (const channel of channels.values()) {
            const textChannel = channel as TextChannel;
            try {
                // Fetch messages in the channel
                const messages = await this.fetchMessages(textChannel, params.limit);
                const matchedMessages = messages.filter(msg => 
                    msg.content.toLowerCase().includes(params.word.toLowerCase())
                );

                // Add search results
                matchedMessages.forEach(msg => {
                    results.push({
                        messageId: msg.id,
                        content: msg.content,
                        channelId: textChannel.id,
                        timestamp: msg.createdAt.toISOString(),
                        author: msg.author.tag,
                    });
                });
            } catch (error) {
                console.error(`Error fetching messages in channel ${textChannel.id}:`, error);
            }
        }

        return results;
    }

    /**
     * Fetches messages from a text channel.
     * @param channel The text channel to fetch messages from.
     * @param limit The maximum number of messages to fetch.
     * @returns An array of messages.
     */
    private async fetchMessages(channel: TextChannel, limit: number): Promise<Message[]> {
        let messages: Message[] = [];
        let lastId: string | null = null;
        let fetchedMessages;

        // Fetch messages in chunks of 100
        do {
            fetchedMessages = await channel.messages.fetch({ limit: 100, before: lastId || undefined });
            messages = messages.concat(Array.from(fetchedMessages.values()) as Message[]);
            lastId = fetchedMessages.size > 0 ? fetchedMessages.last()?.id || null : null;
        } while (fetchedMessages.size != 0 && messages.length < limit);

        return messages.slice(0, limit);
    }
}

/**
 * Represents the result of a search operation.
 */
export interface SearchResult {
  messageId: string;
  content: string;
  channelId: string;
  timestamp: string;
  author: string;
}

/**
 * Represents the parameters for a search operation.
 */
export interface SearchParams {
  word: string;
  limit: number;
}

/**
 * Represents the request body for a search operation.
 */
export interface SearchRequestBody {
  word: string;
  limit: number;
  guildId: string;
}

/**
 * Fetches the current event embed code.
 * Currently using environment variables, but this could be replaced with:
 * - A database call
 * - A CMS API call
 * - A configuration service
 */
export async function getEventEmbed(): Promise<string | undefined> {
  // For now, we'll use an environment variable
  const embedCode = process.env.CURRENT_EVENT_EMBED;
  
  if (!embedCode) {
    return undefined;
  }

  // Validate that the embed code contains an iframe
  if (!embedCode.includes('<iframe')) {
    console.warn('Invalid event embed code: Must contain an iframe');
    return undefined;
  }

  return embedCode;
} 
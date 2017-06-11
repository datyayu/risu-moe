/**
 * Converts an Unix timestamp to a [HH:MM:SS] format.
 *
 * @param timestamp Timestamp to parse.
 */
export function parseTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  // TODO: Padding
  const hour = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  const seconds = date.getSeconds().toString();

  return `[${hour}:${minutes}:${seconds}]`;
}

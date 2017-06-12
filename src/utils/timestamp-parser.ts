import { leftPadding } from "./string-padding";

/**
 * Converts an Unix timestamp to a [HH:MM:SS] format.
 *
 * @param timestamp Timestamp to parse.
 */
export function parseTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  // TODO: Padding
  const hour = leftPadding(date.getHours().toString(), "0", 2);
  const minutes = leftPadding(date.getMinutes().toString(), "0", 2);
  const seconds = leftPadding(date.getSeconds().toString(), "0", 2);

  return `[${hour}:${minutes}:${seconds}]`;
}

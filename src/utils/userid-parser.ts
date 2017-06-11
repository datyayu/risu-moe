/**
 * Shoten the given UserId to max 5 characters
 *
 * @param userId User id to slice.
 */
export function parseUserId(userId: string): string {
  return userId.slice(-5);
}

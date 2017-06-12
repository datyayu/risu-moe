/**
 * Adds left padding to a given string.
 *
 * @param s Source string to add padding to
 * @param padding Character (or string) to use as padding
 * @param size Size the source should should have
 *             after the padding.
 */
export function leftPadding(s: string, padding: string, size: number): string {
  let source = "" + s;

  while (source.length < size) {
    source = padding + source;
  }

  return source;
}

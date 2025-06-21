import globToRegExp from 'glob-to-regexp';


export function matchUriPatterns(reqPath: string, patterns: string[]): boolean {
  return patterns.some(pattern => {
    const regex = globToRegExp(pattern);
    return regex.test(reqPath);
  });
}
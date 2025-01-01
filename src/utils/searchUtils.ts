/**
 * Formats a search query by handling spaces and special characters intelligently
 */
export function formatSearchQuery(query: string): string {
  if (!query) return '';
  
  // Trim and normalize spaces
  const normalized = query.trim().replace(/\s+/g, ' ');
  
  // Handle common card name patterns
  const patterns = [
    { pattern: /(\w+)\s*(V|VMAX|VSTAR|GX|EX)$/i, replace: '$1 $2' }, // Handle card suffixes
    { pattern: /(\d+)\/(\d+)/, replace: '$1/$2' }  // Handle card numbers
  ];

  let formattedQuery = normalized;
  patterns.forEach(({ pattern, replace }) => {
    formattedQuery = formattedQuery.replace(pattern, replace);
  });

  // Add wildcards for partial matches
  const terms = formattedQuery.split(' ').filter(Boolean);
  return terms.map(term => `name:"*${term}*"`).join(' ');
}

/**
 * Debounces a function call
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
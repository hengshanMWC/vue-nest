export function getPageSkipQuantity(page?: number, size?: number) {
  if (page) {
    return (page - 1) * size;
  }
  return 0;
}

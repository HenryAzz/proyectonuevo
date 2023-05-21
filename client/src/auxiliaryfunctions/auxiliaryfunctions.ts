export function getRequestedFilters(array: Array<any>, key: string): Array<string> {
  const requestedKeyArray: Array<string> = [];

  array.forEach((objeto) => {
    if (!requestedKeyArray.includes(objeto[key])) {
      requestedKeyArray.push(objeto[key]);
    }
  });

  return requestedKeyArray;
}

export function getUnicKeys(array: Record<string, any>[]): string[] {
  const UnicKeys: Set<string> = new Set();

  array.forEach((object) => {
    const keys = Object.keys(object);
    keys.forEach((key) => UnicKeys.add(key));
  });

  return Array.from(UnicKeys);
}

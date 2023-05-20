export function getRequestedFilters(array: Array<any>, key: string): Array<string> {
  const requestedKeyArray: Array<string> = [];

  array.forEach((objeto) => {
    if (!requestedKeyArray.includes(objeto[key])) {
      requestedKeyArray.push(objeto[key]);
    }
  });

  return requestedKeyArray;
}

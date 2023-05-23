export function getRequestedFilters(array: Array<any>, key: string): Array<string> {
  const requestedKeyArray: Array<string> = [];

  array.forEach((objeto) => {
    if (!requestedKeyArray.includes(objeto[key])) {
      requestedKeyArray.push(objeto[key]);
    }
  });

  if (!isNaN(Number(requestedKeyArray[0]))) {
    requestedKeyArray.sort((a, b) => Number(a) - Number(b));
  }

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

export const getMinMaxValue = (data: any[], key: string): [number, number] => {
  let minValue = Infinity;
  let maxValue = -Infinity;

  data.forEach((item) => {
    const value = item[key];
    if (value < minValue) {
      minValue = value;
    }
    if (value > maxValue) {
      maxValue = value;
    }
  });

  return [minValue, maxValue];
};

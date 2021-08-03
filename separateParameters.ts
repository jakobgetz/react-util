export const resolveParameters = (params: string[]): object[] => {
  const records: object[] = [];
  let i = 0;
  while (i < params.length) {
    if (params[i].startsWith("-") && i < params.length - 1) {
      records.push({ [params[i]]: params[i + 1] });
      i++;
    } else if (params[i].startsWith("-")) {
      records.push({ [params[i]]: null });
    } else {
      throw new Error(`Invalid parameter ${params[i]}`);
    }
    i++;
  }
  return records;
};

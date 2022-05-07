/**
 *
 * @returns a string representing a locally unique id
 */
export const getUniqueId = (): string => {
  const randomNumbers = new Uint32Array(2);
  crypto.getRandomValues(randomNumbers);

  const randomNumbersString = randomNumbers.join('');
  const randomString = btoa(randomNumbersString);

  return randomString;
};

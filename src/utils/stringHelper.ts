export const isString = (str: any) => typeof str === "string" && str.length > 0;

export const isEmail = (str: any) =>
  isString(str) &&
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test(
    str,
  );

export const removePhoneMask = (str: any) => str.replace(/\D+/g, "");

export const getFirstName = (userName: string | undefined) => {
  if (!isString(userName)) return "";

  const nameSplitted = String(userName).split(" ");
  return nameSplitted[0];
}

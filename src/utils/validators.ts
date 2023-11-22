export const isString = (str: any) => typeof str === "string" && str.length > 0;

export const isEmail = (str: any) =>
  isString(str) &&
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test(
    str,
  );

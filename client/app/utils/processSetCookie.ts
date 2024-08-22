const processSetCookie = (
  setCookieHeader: string,
): {
  name: string;
  value: string;
  path: string;
  expires: Date;
  httpOnly: boolean;
} => {
  const cookieArray = setCookieHeader.split(','); // Assuming multiple cookies are separated by commas
  cookieArray.forEach((cookie) => {
    const [nameValue, ...attributes] = cookie
      .split(';')
      .map((attr) => attr.trim());
    const [name, value] = nameValue.split('=');
    let path: string = '/',
      expires: Date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      httpOnly: boolean = true;
    attributes.forEach((attribute) => {
      if (attribute.startsWith('Path')) path = value;
      if (attribute.startsWith('Expires')) expires = new Date(value);
      if (attribute.startsWith('HttpOnly')) httpOnly = true;
    });
    return {
      name,
      value,
      path,
      expires,
      httpOnly,
    };
  });
};

export default processSetCookie;

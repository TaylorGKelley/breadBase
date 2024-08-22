type CookieObjects = {
  name: string;
  value: string;
  path: string;
  expires: Date;
  httpOnly: boolean;
}[];

const processSetCookie = (setCookieHeader: string): CookieObjects => {
  const cookieArray = setCookieHeader.split(','); // Assuming multiple cookies are separated by commas
  const cookieObjects: CookieObjects = [];
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
    cookieObjects.push({
      name,
      value,
      path,
      expires,
      httpOnly,
    });
  });

  return cookieObjects;
};

export default processSetCookie;

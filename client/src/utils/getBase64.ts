export default function getBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    let reader = new FileReader();

    reader.onloadend = function () {
      // Since it contains the Data URI, we should remove the prefix and keep only Base64 string
      const b64 = (reader.result as string).replace(/^data:.+;base64,/, '');
      resolve(b64);
    };

    reader.readAsDataURL(file);
  });
}

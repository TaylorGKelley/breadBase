export default function getBase64(file: File) {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function () {
      const fileByteArray = Array.from(
        new Uint8Array(reader.result as ArrayBuffer),
      );

      const fileBase = btoa(fileByteArray.join(''));

      resolve(fileBase);
    };
  });
}

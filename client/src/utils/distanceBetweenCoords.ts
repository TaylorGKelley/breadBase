const distanceBetweenCoords = (
  latLngOrgin: [number, number],
  latLngDest: [number, number],
) => {
  return Math.sqrt(
    (latLngOrgin[0] - latLngDest[0]) ** 2 +
      (latLngOrgin[1] - latLngDest[1]) ** 2,
  );
};

export default distanceBetweenCoords;

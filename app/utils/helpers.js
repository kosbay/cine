const arrayChunk = (array, chunkSize) => Array(Math.ceil(array.length / chunkSize))
  .fill()
  .map((_, index) => index * chunkSize)
  .map(begin => array.slice(begin, begin + chunkSize));

export default arrayChunk;

export const insertPositions = (arrayOfObjects) => {
  const nArrayOfObjects = [...arrayOfObjects];

  for (let i = 0; i < nArrayOfObjects.length; i += 1) {
    let nPosition = 1;
    if (i > 0) {
      if (arrayOfObjects[i].wupai === arrayOfObjects[i - 1].wupai) { nPosition = nArrayOfObjects[i - 1].position; } else nPosition = nArrayOfObjects[i - 1].position + 1;
    }
    nArrayOfObjects[i].position = nPosition;
  }

  return nArrayOfObjects;
};

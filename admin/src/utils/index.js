const randomInRange = (from, to) => {
  const r = Math.random();
  return Math.floor(r * (to - from) + from);
};

export default randomInRange;

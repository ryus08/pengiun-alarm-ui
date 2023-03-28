module.exports = ({ pollFunction }) => {
  const refresh = () =>
    pollFunction().then((refreshRate) => {
      setTimeout(refresh, refreshRate);
    });
  refresh();
};

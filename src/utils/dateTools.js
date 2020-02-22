const dateTools = {};
dateTools.SecondToMS = s => {
  let mm = "00";
  let ss = "00";
  mm = Math.floor(s / 60);
  if (mm < 10) {
    mm = "0" + mm;
  }
  ss = Math.floor(s % 60);
  if (ss < 10) {
    ss = "0" + ss;
  }
  if (s === 0) {
    mm = "00";
    ss = "00";
  }
  return mm + ":" + ss;
};

export default dateTools;

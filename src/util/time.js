const timeConvert = time => {
  if (time) {
    return new Date(time).toLocaleString();
  } else {
    return "";
  }
};

export { timeConvert };

const dayjs = require("dayjs");

const format_date = () => {
  return dayjs().format("dddd, MMMM D");
}

const todays_day = () => {
  return dayjs().format("dddd")
}

const total_price = (x, y) => {
  return x * y;
}

module.exports = { format_date, todays_day, total_price};

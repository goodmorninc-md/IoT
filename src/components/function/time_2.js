import dayjs from "dayjs";
import "dayjs/locale/zh-cn"; // 导入语言包
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs-plugin-utc";
import GetTime1 from "./time";
// 扩展Day.js以使用UTC和时区功能
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Shanghai"); // 设置默认时区
const nowUTC = dayjs().utc();
// 将UTC时间转换为中国时区（东八区）时间
const chinaTime = nowUTC.tz("Asia/Shanghai");

export function timestampToChinaNormal(timestamp) {
  let temp = timestamp;
  // console.log(new Date(temp).toLocaleString("zh-CN", { hour12: false }));
  return new Date(temp).toLocaleString("zh-CN", { hour12: false });
}
export function timestampToIso(timestamp) {
  return new Date(timestamp);
}
export function normalToISO(dateString) {
  // console.log(dateString);
  const date = new Date(dateString);
  const utcTimestamp = date.getTime() + 8 * 3600000; // 减去 8 小时，得到 UTC 时间戳
  const utcDate = new Date(utcTimestamp);
  return utcDate.toISOString();
}
/**
 *
 * @param {*} isoString
 * @returns number
 */
export function IsoToTimestamp(isoString) {
  const date = new Date(isoString);

  return date.getTime();
}
export function GetTime() {
  console.log(1);
}
export function GetRecentHourIso() {
  // 获取一个小时前的中国时区时间
  const oneHourAgoChinaTime = chinaTime.subtract(1, "hour");
  const adjustedOneHourAgoUTC = oneHourAgoChinaTime
    .add(8, "hour")
    .utc()
    .format("YYYY-MM-DDTHH:mm:ss[Z]");
  return adjustedOneHourAgoUTC;
}
export function GetRecentWeekIso() {
  // 获取一周前的中国时区时间
  const oneWeekAgoChinaTime = chinaTime.subtract(1, "week");
  const adjustedOneWeekAgoUTC = oneWeekAgoChinaTime
    .add(8, "hour")
    .utc()
    .format("YYYY-MM-DDTHH:mm:ss[Z]");
  return adjustedOneWeekAgoUTC;
}
export function GetRecentDayIso() {
  // 获取一天前的中国时区时间
  const oneDayAgoChinaTime = chinaTime.subtract(1, "day");

  const adjustedOneDayAgoUTC = oneDayAgoChinaTime
    .add(8, "hour")
    .utc()
    .format("YYYY-MM-DDTHH:mm:ss[Z]");

  return adjustedOneDayAgoUTC;
}

export function GetNowIso() {
  const adjustedNowUTC = chinaTime
    .add(8, "hour")
    .utc()
    .format("YYYY-MM-DDTHH:mm:ss[Z]");
  return adjustedNowUTC;
}

// 根据时间戳获取中国时区时间并格式化为UTC格式
export function convertTimestampToUTC(timestamp) {
  // 创建Day.js对象并转换为中国时区时间
  const chinaTime = dayjs(timestamp).tz("Asia/Shanghai");
  // 将中国时区时间格式化为UTC格式
  const formattedUTC = chinaTime
    .add(8, "hour")
    .utc()
    .format("YYYY-MM-DDTHH:mm:ss[Z]");
  return formattedUTC;
}
export function UTCtoNormal(utc) {
  if(utc === undefined) return  "请选择时间"
  // console.log(utc)
  // 创建Day.js对象
  const date = dayjs(utc);

  // 格式化为指定的格式：YYYY/MM/DD HH:mm:ss
  const formattedDate = date.format("YYYY/MM/DD HH:mm:ss");

  return formattedDate !== "Invalid Date" ? formattedDate : "请选择时间";
}

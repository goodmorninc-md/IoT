/**
 * 将2020-07-09T20:19:03.000Z转换为2020-07-09 20:19:03
 */
export default function GetTime(isoDateString) {
  // console.log(isoDateString)
  // const date = new Date(isoDateString).toLocaleString("zh-CN", {
  //   hour12: false,
  // });
  // console.log(date)
  // // 获取年、月、日和时间
  // const year = date.getUTCFullYear();
  // const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  // const day = date.getUTCDate().toString().padStart(2, "0");
  // const hours = date.getUTCHours().toString().padStart(2, "0");
  // const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  // const seconds = date.getUTCSeconds().toString().padStart(2, "0");

  // // 组合成年-月-日 时间的格式
  // const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  // return formattedDate;
  // const date = new Date(isoDateString);

  // const year = date.getFullYear();
  // const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
  // const day = String(date.getDate()).padStart(2, '0');
  // const hours = String(date.getHours()).padStart(2, '0');
  // const minutes = String(date.getMinutes()).padStart(2, '0');
  // const seconds = String(date.getSeconds()).padStart(2, '0');

  // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const date = new Date(isoDateString);

  // 将 UTC 时间转换为中国时区时间
  const utcTimestamp = date.getTime() + (date.getTimezoneOffset() * 60000);
  const chinaTimestamp = new Date(utcTimestamp + (8 * 3600000));

  const year = chinaTimestamp.getFullYear();
  const month = String(chinaTimestamp.getMonth() + 1).padStart(2, '0');
  const day = String(chinaTimestamp.getDate()).padStart(2, '0');
  const hours = String(chinaTimestamp.getHours()).padStart(2, '0');
  const minutes = String(chinaTimestamp.getMinutes()).padStart(2, '0');
  const seconds = String(chinaTimestamp.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export class CommonUtils {
  transFormDateTimeStr(d: Date) {
    if (d) {
      return d.getFullYear() +
        '/' +
        (d.getMonth() + 1) +
        '/' +
        d.getDate() +
        ' ' +
        d.getHours() +
        ':' +
        d.getMinutes() +
        ':' +
        d.getSeconds();
    }
  }

  convertDateFromString(dateString) {
    if (dateString) {
      return new Date(dateString.replace(/-/, '/'));
    }
  }

  ConvertDateTimeStr = (d: Date) => {
    if (!d) {
      return '';
    }

    return d.getFullYear() +
      '-' +
      (d.getMonth() + 1) +
      '-' +
      d.getDate() +
      '\xa0' +
      d.getHours() +
      ':' +
      d.getMinutes() +
      ':' +
      d.getSeconds();
  };

//   export const ConvertDateTimeStr = (d: Date) => {
//   if (!d) {
//     return '';
//   }
//   var datetimeStr =
//     d.getFullYear() +
//     '-' +
//     (d.getMonth() + 1) +
//     '-' +
//     d.getDate() +
//     '\xa0' +
//     d.getHours() +
//     ':' +
//     d.getMinutes() +
//     ':' +
//     d.getSeconds();
//   return datetimeStr;
// };
}

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
}

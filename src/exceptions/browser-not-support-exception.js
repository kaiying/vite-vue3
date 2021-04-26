export const browserNotSupportType = {
  localStorage: 'localStorage',
};

const errorTypeDisplay = {
  localStorage: 'Local Storage',
};

export const BrowserNotSupportException = function (type, message) {
  message = message ? `，訊息：${message}。` : '';
  this.message = `【瀏覽器不支援】：${errorTypeDisplay[type]}${message}`;
  this.error = browserNotSupportType[type];
  this.type = 'BrowserNotSupportException';
};

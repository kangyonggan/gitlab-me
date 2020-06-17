import Vue from 'vue';

let util = {};

/**
 * 设置浏览器标题
 *
 * @param title
 */
util.title = function (title) {
  title = title ? title + ' · GitLab' : 'GitLab';
  window.document.title = title;
};

/**
 * 时间戳格式化
 *
 * @param timestamp
 * @param format
 */
util.formatTimestamp = function (timestamp, format) {
  let date = new Date(timestamp);
  let o = {
    'M+': date.getMonth() + 1,                 //月份
    'd+': date.getDate(),                    //日
    'H+': date.getHours(),                   //小时
    'm+': date.getMinutes(),                 //分
    's+': date.getSeconds(),                 //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    'S': date.getMilliseconds()             //毫秒
  };

  if (!format) {
    format = 'yyyy-MM-dd HH:mm:ss';
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return format;
};

/**
 * 格式化状态
 *
 * @param isDeleted
 */
util.formatStatus = function (isDeleted) {
  return isDeleted ? 'Removed' : 'Normal';
};

/**
 * 格式化是否
 *
 * @param val
 */
util.formatYesNo = function (val) {
  return val ? 'Yes' : 'No';
};


const isServer = Vue.prototype.$isServer;
/* istanbul ignore next */
util.on = (function () {
  if (!isServer && document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();

util.off = (function () {
  if (!isServer && document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();

// scrollTop animation
util.scrollTop = function (el, from = 0, to, duration = 500) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil(difference / duration * 50);

  function scroll(start, end, step) {
    if (start === end) return;

    let d = (start + step > end) ? end : start + step;
    if (start > end) {
      d = (start - step < end) ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  }

  scroll(from, to, step);
};

/**
 * 保留字
 */
util.reservedWords = ['admin', 'users', 'profile', 'groups', 'projects', '404', '500'];

/**
 * 检测是否是保留字
 *
 * @param that
 * @param value
 * @param callback
 */
util.checkReserved = function (that, value, callback) {
  if (util.reservedWords.includes(value)) {
    callback(new Error(value + ' is a reserved name'));
    return;
  }
  that.axios.get('validate/uniqueCode?code=' + value).then(() => {
    callback();
  }).catch(res => {
    callback(new Error(res.respMsg));
  });
};

export default util;

Vue.prototype.util = util;
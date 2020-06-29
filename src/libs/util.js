import Vue from 'vue';
import adminMenus from '../menus/admin-menus';
import profileMenus from '../menus/profile-menus';
import groupsMenus from '../menus/groups-menus';
import projectMenu from '../menus/projects-menus';
import store from '../store';

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
  if (!timestamp) {
    return '';
  }
  let date = new Date(timestamp * 1);
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

util.adjustBreadcrumds = function (route, breadcrumbs, data) {
  if (route.meta.menuType === 'Admin') {
    if (breadcrumbs.length && breadcrumbs[0].url === '/admin') {
      breadcrumbs.push({
        name: 'Dashboard'
      });
    } else {
      breadcrumbs.unshift({
        url: '/admin',
        name: 'Admin Area'
      });
    }
  } else if (route.meta.menuType === 'Profile') {
    if (breadcrumbs[0].url === '/profile') {
      breadcrumbs.push({
        name: 'Edit Profile'
      });
    } else {
      breadcrumbs.unshift({
        url: '/profile',
        name: 'User Settings'
      });
    }
  } else if (route.meta.menuType === 'Groups') {
    if (breadcrumbs.length > 1 || !breadcrumbs[0].avatarType) {
      breadcrumbs.unshift({
        url: '/' + data.item.groupPath,
        avatarType: 'retro',
        avatar: data.item.groupAvatar,
        emptyAvatar: data.item.groupPath,
        name: data.item.groupName
      });
    } else if (breadcrumbs.length === 1 && breadcrumbs[0].avatarType) {
      breadcrumbs.push({
        name: 'Detail'
      });
    }
  } else if (route.meta.menuType === 'Projects') {
    if (breadcrumbs.length > 1 || !breadcrumbs[0].char) {
      breadcrumbs.unshift({
        url: '/' + data.project.namespace + '/' + data.project.projectPath,
        char: data.project.projectPath.substring(0, 1),
        name: data.project.projectName
      });
      if (data.user) {
        breadcrumbs.unshift({
          url: '/' + data.user.username,
          avatarType: 'retro',
          avatar: data.user.email,
          name: data.project.fullName
        });
      } else {
        breadcrumbs.unshift({
          url: '/' + data.group.groupPath,
          avatarType: 'retro',
          avatar: data.group.groupAvatar,
          emptyAvatar: data.group.groupPath,
          name: data.group.groupName
        });
      }
    } else if (breadcrumbs.length === 1 && breadcrumbs[0].char) {
      if (data.user) {
        breadcrumbs.unshift({
          url: '/' + data.user.username,
          avatarType: 'retro',
          avatar: data.user.email,
          name: data.project.fullName
        });
      } else {
        breadcrumbs.unshift({
          url: '/' + data.group.groupPath,
          avatarType: 'retro',
          avatar: data.group.groupAvatar,
          emptyAvatar: data.group.groupPath,
          name: data.group.groupName
        });
      }
      breadcrumbs.push({
        name: 'Detail'
      });
    }
  }

  store.commit('setBreadcrumbs', breadcrumbs);
  util.updateTitleWithBreadcrumbs(breadcrumbs);
};

util.updateBreadcrumbsAndTitle = function (name) {
  let breadcrumbs = store.getters.getBreadcrumbs;
  breadcrumbs[breadcrumbs.length - 1].name = name;
  util.updateTitleWithBreadcrumbs(breadcrumbs);
};

util.updateTitleWithBreadcrumbs = function (breadcrumbs) {
  // title
  let title = '';
  for (let i = breadcrumbs.length - 1; i >= 0; i--) {
    title += breadcrumbs[i].name + ' · ';
  }
  title += 'GitLab';
  window.document.title = title;
};

util.getBreadcrumbs = function (route, menus) {
  let breadcrumbs = [];
  for (let i in menus) {
    let menu = menus[i];
    if (menu.url === route.path) {
      breadcrumbs.push(menu);
      return breadcrumbs;
    }
    if (menu.children) {
      const subBreadcrumbs = util.getBreadcrumbs(route, menu.children);
      if (subBreadcrumbs.length) {
        breadcrumbs.push(menu);
        breadcrumbs = breadcrumbs.concat(subBreadcrumbs);
        return breadcrumbs;
      }
    }
  }

  return breadcrumbs;
};

/**
 * 当路由改变，获取新菜单
 *
 * @param route
 */
util.getMenusWithNewRoute = async function (route) {
  let menus = [];
  if (route.meta.menuType === 'Admin') {
    menus = adminMenus;
  } else if (route.meta.menuType === 'Profile') {
    menus = profileMenus;
  } else if (route.meta.menuType === 'Groups') {
    let code = route.params.path;
    if (!code) {
      code = route.meta.item.groupPath;
    }
    menus = util.replaceMenusCode(groupsMenus, code);
    await store.dispatch('getCodeType', code).then(data => {
      menus[0].name = data.item.groupName;
      menus[0].avatar = data.item.groupAvatar;
      menus[0].emptyAvatar = code;
      menus[0].avatarType = 'retro';

      let breadcrumbs = util.getBreadcrumbs(route, menus);
      if (!breadcrumbs.length) {
        breadcrumbs = util.getBreadcrumbs({path: route.meta.parentPath}, menus);
        breadcrumbs.push({name: route.meta.title});
      }
      util.adjustBreadcrumds(route, breadcrumbs, data);
    });

    store.commit('setMenus', menus);
    return;
  } else if (route.meta.menuType === 'Projects') {
    let namespace = route.params.namespace;
    let projectPath = route.params.projectPath;
    menus = util.replaceProjectMenus(projectMenu, namespace, projectPath);
    await store.dispatch('getProject', {namespace: namespace, projectPath: projectPath}).then(data => {
      menus[0].name = data.project.projectName;
      menus[0].char = data.project.projectPath.substring(0, 1);

      let breadcrumbs = util.getBreadcrumbs(route, menus);
      if (!breadcrumbs.length) {
        breadcrumbs = util.getBreadcrumbs({path: route.meta.parentPath}, menus);
        breadcrumbs.push({name: route.meta.title});
      }
      util.adjustBreadcrumds(route, breadcrumbs, data);
    });

    store.commit('setMenus', menus);
    return;
  }

  let breadcrumbs = util.getBreadcrumbs(route, menus);
  if (!breadcrumbs.length) {
    breadcrumbs = util.getBreadcrumbs({path: route.meta.parentPath}, menus);
    breadcrumbs.push({name: route.meta.title});
  }
  util.adjustBreadcrumds(route, breadcrumbs);

  store.commit('setMenus', menus);
};

/**
 * 替换菜单中的{code}
 *
 * @param menus
 * @param code
 * @returns {[]}
 */
util.replaceMenusCode = function (menus, code) {
  let resultMenus = [];
  for (let i = 0; i < menus.length; i++) {
    let menu = Object.assign({}, menus[i]);
    menu.url = menu.url.replace(/\{code}/, code);
    if (menu.children && menu.children.length) {
      menu.children = util.replaceMenusCode(menu.children, code);
    }
    resultMenus[i] = menu;
  }
  return resultMenus;
};

/**
 * 替换项目菜单中的变量
 *
 * @param menus
 * @param namespace
 * @param projectPath
 * @returns {[]}
 */
util.replaceProjectMenus = function (menus, namespace, projectPath) {
  let resultMenus = [];
  for (let i = 0; i < menus.length; i++) {
    let menu = Object.assign({}, menus[i]);
    menu.url = menu.url.replace(/\{namespace}/, namespace);
    menu.url = menu.url.replace(/\{projectPath}/, projectPath);
    if (menu.children && menu.children.length) {
      menu.children = util.replaceProjectMenus(menu.children, namespace, projectPath);
    }
    resultMenus[i] = menu;
  }
  return resultMenus;
};

/**
 * 格式化大小，如：2 KB
 *
 * @param size
 * @returns {string}
 */
util.formatSize = function (size) {
  if (size >= 1048576) {
    return (size / 1048576).toFixed(2) + ' GB';
  } else if (size > 1024) {
    return (size / 1024).toFixed(2) + ' MB';
  } else {
    return size + ' KB';
  }
};

/**
 * 计算相对时间，如：2 minutes ago.
 *
 * 1天86400000毫秒
 *
 * @param timestamp
 * @returns {string}
 */
util.relativeTime = function (timestamp) {
  let offset = new Date().getTime() - timestamp * 1;
  let day = 86400000;

  let num;
  if (offset > 365 * day) {
    num = Math.floor(offset / (365 * day));
    return num + (num > 1 ? ' years ago' : ' year ago');
  } else if (offset > 30 * day) {
    num = Math.floor(offset / (30 * day));
    return num + (num > 1 ? ' months ago' : ' month ago');
  } else if (offset > day) {
    num = Math.floor(offset / day);
    return num + (num > 1 ? ' days ago' : ' day ago');
  } else if (offset > 604800000) {
    num = Math.floor(offset / 604800000);
  } else if (offset > 3600000) {
    num = Math.floor(offset / 3600000);
    return num + (num > 1 ? ' hours ago' : ' hour ago');
  } else if (offset > 60000) {
    num = Math.floor(offset / 60000);
    return num + (num > 1 ? ' minutes ago' : ' minute ago');
  }

  return 'just now';
};

export default util;

Vue.prototype.util = util;
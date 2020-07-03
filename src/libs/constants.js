import Vue from 'vue';

let constants = {};

/**
 * 成功
 *
 * @type {string}
 */
constants.SUCCESS = '0000';

/**
 * 权限不足
 *
 * @type {string}
 */
constants.PERMISSION_DENIED = '9997';

/**
 * 登录已失效
 *
 * @type {string}
 */
constants.INVALID_LOGIN = '9998';

/**
 * 未知异常
 *
 * @type {string}
 */
constants.FAILURE = '9999';

/**
 * 数据无效
 *
 * @type {string}
 */
constants.INVALID_DATA = '9996';

/**
 * token在header中的名称
 *
 * @type {string}
 */
constants.HEADER_TOKEN_NAME = 'x-auth-token';

/**
 * token在本地存储的名称
 *
 * @type {string}
 */
constants.LOCAL_TOKEN_NAME = 'token';

/**
 * 访问权限
 */
constants.ACCESS_LIST = [
  {
    code: 0,
    name: 'Guest'
  },
  {
    code: 1,
    name: 'Reporter'
  },
  {
    code: 2,
    name: 'Developer'
  },
  {
    code: 3,
    name: 'Master'
  },
  {
    code: 4,
    name: 'Owner'
  }
];

/**
 * gitlab地址
 *
 * @type {string}
 */
constants.EXTERNAL_URL = 'https://kangyonggan.com/gitlab';
if (process.env.NODE_ENV === 'development') {
  constants.EXTERNAL_URL = 'http://127.0.0.1';
}

export default constants;

Vue.prototype.constants = constants;
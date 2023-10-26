export enum AppHttpCode {
  SUCCESS = 200,
  // 拒绝
  REJECT = 403,
  ERROR = 500,
  /** 公共错误 */
  /** 服务器出错 */
  SERVICE_ERROR = 500500,
  /** 数据为空 */
  DATA_IS_EMPTY = 100001,
  /** 参数有误 */
  PARAM_INVALID = 100002,
  /** 文件类型错误 */
  FILE_TYPE_ERROR = 100003,
  /** 文件超出大小 */
  FILE_SIZE_EXCEED_LIMIT = 100004,
  /** 创建用户已存在，用户名 */
  USER_CREATE_EXISTING_ACCOUNT = 200001,
  /** 创建用户已存在 手机号 */
  USER_CREATE_EXISTING_PHONE = 200005,
  /** 创建用户已存在 邮箱 */
  USER_CREATE_EXISTING_EMAIL = 200006,
  /** 两次密码输入不一致, 账号密码不一致等 */
  USER_PASSWORD_INVALID = 200002,
  /** 帐号被禁用 */
  USER_ACCOUNT_FORBIDDEN = 200003,
  /** 用户状态更改，当前用户 与 修改用户一致 */
  USER_FORBIDDEN_UPDATE = 20004,
  /** 用户不存在 */
  USER_NOT_FOUND = 200004,
  /** 角色未找到 */
  ROLE_NOT_FOUND = 300004,
  /** 角色不可删除 */
  ROLE_NOT_DEL = 300005,
  /** 无权限 */
  ROLE_NO_FORBIDDEN = 300403,
}

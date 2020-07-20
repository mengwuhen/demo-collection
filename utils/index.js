// 邮箱验证
export const isEmail = (s) => {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
    s
  );
};

// 手机验证
export const isMobile = (s) => {
  return /^1[0-9]{10}$/.test(s);
};

// 电话验证
export const isPhone = (s) => {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
};

//是否url地址
export const isURL = (s) => {
  return /^http[s]?:\/\/.*/.test(s);
};

// 是否是字符串
export const isString = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "String";
};

// 是否是字符串
export const isNumber = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Number";
};

// 是否是boolean
export const isBoolean = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Boolean";
};

// 是否是函数
export const isFunction = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Function";
};

// 是否为null
export const isNull = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Null";
};

// 是否为Undefined
export const isUndefined = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Undefined";
};

//是否对象
export const isObj = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Object";
};

//是否数组
export const isArray = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Array";
};

//是否时间
export const isDate = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Date";
};

//是否正则
export const isRegExp = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "RegExp";
};

// 是否错误对象
export const isError = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Error";
};

// 是否Symbol函数
export const isSymbol = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Symbol";
};
// 是否Promise对象
export const isPromise = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Promise";
};
// 是否Set对象
export const isSet = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Set";
};

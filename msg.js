function warn(params) {
  console.log("\x1b[33m%s\x1b[0m", params);
}
function success(message) {
  console.log("\x1b[32m%s\x1b[0m", message);
}

export { success, warn };

module.exports = function check(str, bracketsConfig) {
  if (str.length % 2) return false;
  let arrStack = [],
      strStackItem,
      isOpenBracket,
      isOpenDuplicate = {};

  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < bracketsConfig.length; j++) {
        if (!~bracketsConfig[j].indexOf(str[i])) continue;
        if (!bracketsConfig[j].indexOf(str[i])) {
            if (str[i] !== bracketsConfig[j][1]) {
                isOpenBracket = true;
            } else {
                if (!(str[i] in isOpenDuplicate) || isOpenDuplicate[str[i]] == false) {
                    isOpenBracket = isOpenDuplicate[str[i]] = true;
                } else {
                    isOpenBracket = isOpenDuplicate[str[i]] = false;
                }
            }
        } else {
            isOpenBracket = false;
        }
    }

    if (isOpenBracket) {
        arrStack.push(str[i]);
    } else  {
        strStackItem = arrStack.pop();
        for (let k = 0; k < bracketsConfig.length; k++) {
            if (~bracketsConfig[k].indexOf(str[i]) && ~bracketsConfig[k].indexOf(strStackItem))  break;
            else if (~bracketsConfig[k].indexOf(str[i]) || ~bracketsConfig[k].indexOf(strStackItem)) return false;
        }
    }
  }

  return (arrStack.length == 0) ? true : false;
}

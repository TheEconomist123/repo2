//计算总页数 totalPage：总页数；pagesize：页码大小
export function calPageNumByTotalPage(totalPage, pagesize) {
  if (totalPage && totalPage > 0 && pagesize > 0) {
    return parseInt(totalPage / pagesize) + (totalPage % pagesize > 0 ? 1 : 0);
  } else {
    return 0;
  }
}

/**
 * 分页取出数组内荣
 * @param {*} arrya
 * @param {*} rownum
 * @param {*} pageSize
 */
export function getArrayData(arrya, rownum, pageSize) {
  var nwarry = [];
  for (
    var i = (rownum - 1) * pageSize;
    i < rownum * pageSize && i < arrya.length;
    i++
  ) {
    nwarry.push(arrya[i]);
  }
  return nwarry;
}

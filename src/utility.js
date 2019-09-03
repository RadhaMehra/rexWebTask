export const isObjEmpty = (obj1) => {
  let flag = true
  const traverseNode = (arr, id, n, obj) => {
    if (id >= n) return

    if (obj[arr[id]] instanceof Object) {
      traverseNode(Object.keys(obj[arr[id]]), 0, Object.keys(obj[arr[id]]).length, obj[arr[id]])
    } else if (obj[arr[id]] !== '') {
      flag = false

      return
    } else {
      traverseNode(arr, id + 1, n, obj)
    }
  }
  traverseNode(Object.keys(obj1), 0, Object.keys(obj1).length, obj1)

  return flag
}
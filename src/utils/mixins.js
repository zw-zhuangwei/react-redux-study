import cookie from 'js-cookie'

import { COMMON_ENUMS } from '@config/constant'

const MIXINS = {
  formatEnums: (key) => { // 获取枚举组
    let e = JSON.parse(cookie.get(COMMON_ENUMS))
    let a = []
    e.some(t => {
      if (t.code === key) {
        a = t.children
        return true
      }
      return true
    });
    return a
  },
  formatEnumsValue: (key1, key2) => { // 获取枚举对应值
    let e = JSON.parse(cookie.get(COMMON_ENUMS))
    let v = ''
    let f1 = false
    let f2 = false
    e.some(t1 => {
      if (t1.code === key1) {
        t1.children.some(t2 => {
          if (t2.code === key2) {
            v = t2.name
            f2 = true
            return true
          }
          return f2
        })
        f1 = true
      }
      return f1
    });
    return v
  }
}

export default MIXINS
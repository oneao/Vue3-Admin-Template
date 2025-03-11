import { reactive } from "vue"

export function useRefs() {
  const refs = reactive<{ [key: string]: any }>({})

  function setRefs(name: string) {
    return (el: any) => {
      refs[name] = el
      return () => refs[name]
    }
  }

  return { refs, setRefs }
}
export function findDifferingFields(obj1: Record<string, any>, obj2: Record<string, any>, retainFields: string[] = []): Record<string, any> {
  const differingFields: Record<string, any> = {}

  for (const key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      const val1 = obj1[key]
      const val2 = obj2[key]

      // 比较值
      const areValuesDifferent =
        typeof val1 === "number" && typeof val2 === "string"
          ? val1 !== Number(val2) // 数字和字符串类型值比较
          : typeof val1 === "string" && typeof val2 === "number"
            ? Number(val1) !== val2 // 字符串和数字类型值比较
            : val1 !== val2 // 其他情况直接比较

      // 值不同或属于保留字段
      if (areValuesDifferent || retainFields.includes(key)) {
        differingFields[key] = val1
      }
    }
  }

  return differingFields
}

export function replaceURI(s: string): string {
  let sresult = s
  sresult = sresult.replace(/&/g, "%26").replace(/=/g, "%3D").replace(/#/g, "%23")
  return sresult
}

export function downloadFile(url: string, fileName: string) {
  const x = new XMLHttpRequest()
  x.open("GET", url, true)
  x.responseType = "blob"
  x.onload = function (e) {
    const url = window.URL.createObjectURL(x.response)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    a.click()
  }
  x.send()
}

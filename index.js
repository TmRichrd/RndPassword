/**
 * 获取节点
 */
const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolEl = document.getElementById('symbol')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

/**
 * 创建object随机对象
 */
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomupper,
  number: getRandomNumber,
  symbol: getRandomSymbol
}
/**
 * 生成密码监听
 */
generateEl.addEventListener('click', () => {
  /**
   * 判断是否选中和数值
   */
  const length = lengthEl.value
  const hasLower = lowercaseEl.checked
  const hasUpper = uppercaseEl.checked
  const hasNumber = numbersEl.checked
  const hasSymbol = symbolEl.checked
  resultEl.innerHTML = generatedPassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  )
})

/**
 * 随机小写
 */
function getRandomLower() {
  /**
   * Math.floor(Math.random()*26) 26个字母
   *随机小写字母是从97开始的
   */
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}
/**
 * 随机大写
 */
function getRandomupper() {
  /**
   * Math.floor(Math.random()*26) 26个字母
   * 随机大写字母是从65开始的
   */
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}
/**
 * 随机数字
 */
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}
/**
 * 随机符号
 */
function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.'
  /**
   * symbols随机产生的第几个数*他的长度
   */
  return symbols[Math.floor(Math.random() * symbols.length)]
}
/**
 *
 * @param {*} lower
 * @param {*} upper
 * @param {*} number
 * @param {*} symbol
 * @param {*} length
 */
function generatedPassword(lower, upper, number, symbol, length) {
  /**
   * 1.初始化密码
   * 2.过滤出没有选中的密码类型
   * 3.通过循环获得每个密码的变量
   * 4.奖处理后的随机密码结果进行保存再返回值
   */
  let generatedPassword = ''
  const typesCount = lower + upper + number + symbol
  const typeArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    item => Object.values(item)[0]
  )
  /**
   * 如果全部没选
   */
  if (typesCount === 0) {
    return ''
  }
  // console.log(typeArr)
  /**
   * 循环需要生成的密码长度length
   */
  for (let i = 0; i < length; i += typesCount) {
    typeArr.forEach(type => {
      /**
       * 每次循环出选中的type
       */
      const funcName = Object.keys(type)[0]
      // console.log(funcName)
      /**
       * 将结果用randomFunc()去比对键值
       * 然后执行方法
       */
      generatedPassword += randomFunc[funcName]()
    })
  }
  const finalPassword = generatedPassword.slice(0, length)
  return finalPassword
  // console.log(generatedPassword)
}

/**
 * 复制到剪切板事件监听
 */
clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea')
  const password = resultEl.innerHTML
  if (!password) {
    return
  }
  textarea.value = password
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
  alert('密码已复制到剪切板!')
})

function getMonth(month) {
  let transferMonth = ''
  if (month === '01') transferMonth = '一月'
  if (month === '02') transferMonth = '二月'
  if (month === '03') transferMonth = '三月'
  if (month === '04') transferMonth = '四月'
  if (month === '05') transferMonth = '五月'
  if (month === '06') transferMonth = '六月'
  if (month === '07') transferMonth = '七月'
  if (month === '08') transferMonth = '八月'
  if (month === '09') transferMonth = '九月'
  if (month === '10') transferMonth = '十月'
  if (month === '11') transferMonth = '十一月'
  if (month === '12') transferMonth = '十二月'
  return { value: month, name: transferMonth }
}

module.exports = getMonth

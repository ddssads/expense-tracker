function addIcon(category) {
  let icon = ''
  if (category === '家居物業') {
    icon = '<i class="fas fa-home"></i>'
  }
  if (category === '交通出行') {
    icon = '<i class="fas fa-shuttle-van"></i>'
  }
  if (category === '休閒娛樂') {
    icon = '<i class="fas fa-grin-beam"></i>'
  }
  if (category === '餐飲食品') {
    icon = '<i class="fas fa-utensils"></i>'
  }
  if (category === '其他') {
    icon = '<i class="fas fa-pen"></i>'
  }
  return icon
}

module.exports = addIcon

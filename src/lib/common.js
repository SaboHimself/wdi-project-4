class Common {
  static checkChange(coin) {
    if(coin['1d'].price_change_pct >= 0) {
      return 'up'
    }
    return 'down'
  }
}

export default Common

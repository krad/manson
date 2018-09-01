class Logger {
  constructor() {
    this.handler = (msg, context) => {
      console.log(this.formatter(msg, context))
    }

    this.formatter = (msg, context) => {
      const label = levelLabel(context.level)
      const wsCnt = 5 - label.length
      const ws    = " ".repeat(wsCnt)
      let result = [`${ws}${label}`]
      result.push(`[${new Date().toUTCString()}]`)
      result.push(msg)
      return result.join(' - ')
    }
  }

  log(msg, context) {
    if (context.level <= this.level && this.level > Manson.OFF) {
      this.handler(msg, context)
    }
  }
}

let logger = new Logger()

class Manson {

  static get OFF()        { return -1 }
  static get DEBUG()      { return 0 }
  static get INFO()       { return 1 }
  static get WARN()       { return 2 }
  static get ERROR()      { return 3 }
  static get TRACE()      { return 4 }
  static get level()      { return logger.level }
  static set level(val)   { logger.level = val }
  static set handler(val) { logger.handler = val }

  static labelFor(level) {
    return levelLabel(level)
  }

  static debug(msg)  { logger.log(msg, {level: Manson.DEBUG}) }
  static info(msg)   { logger.log(msg, {level: Manson.INFO})  }
  static warn(msg)   { logger.log(msg, {level: Manson.WARN})  }
  static error(msg)  { logger.log(msg, {level: Manson.ERROR}) }
  static trace(msg)  { logger.log(msg, {level: Manson.TRACE}) }

  static setup(config) {
    logger = new Logger()
    const c      = config || {}
    logger.level = c.level || this.DEBUG
  }
}

const levelLabel = (levelNumber) => {
  switch (levelNumber) {
    case -1: return 'OFF'
    case 0:  return 'DEBUG'
    case 1:  return 'INFO'
    case 2:  return 'WARN'
    case 3:  return 'ERROR'
    case 4:  return 'TRACE'
    default: return 'UNKNOWN'
  }
}

export default Manson

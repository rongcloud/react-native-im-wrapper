class Logger {
  enable = false
  public readonly tag: string
  /**
   *
   * @param tag 标签
   */
  constructor(tag: string) {
    this.tag = tag
  }

  public log(str: string) {
    if (this.enable)
      console.log(`[${this.tag}] ${new Date().toISOString()} ${str}`)
  }

  public logObject(str: string, obj: Object) {
    this.log(`${str} ${this.toString(obj)}`)
  }

  public toString(obj: any) {
    return JSON.stringify(obj)
  }
}

const logger = new Logger('RCRNIMLib');
export  {logger}

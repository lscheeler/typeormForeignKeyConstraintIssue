import * as crypto from 'crypto';

export default class Environment {
  /**
   *
   *
   * @readonly
   * @static
   * @type {string}
   * @memberof Environment
   */
  public static get NODE_ENV(): string {
    return process.env.NODE_ENV || 'development';
  }
}

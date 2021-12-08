import {format} from 'date-fns';

export type CONSOLE_METHOD_KEY = 'info' | 'warn' | 'error';

export enum MESSAGE_TYPE {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

enum TERMINAL_COLOR {
  CYAN = '\x1b[36m',
  YELLOW = '\x1b[33m',
  RED = '\x1b[31m',
}

const RESET_ATTRIBUTE = '\x1b[0m';

export default class Logger {
  private static shouldShowInfo = true;
  private static shouldShowWarn = true;

  static info(message: string, data?: unknown) {
    if (!this.shouldShowInfo) {
      return;
    }

    const formattedMessage = this.prepareMessageToLog(
      MESSAGE_TYPE.INFO,
      message,
    );

    this.logColoredMessage(
      TERMINAL_COLOR.CYAN,
      MESSAGE_TYPE.INFO,
      formattedMessage,
      data,
    );
  }

  static warn(message: string, data?: unknown) {
    if (!this.shouldShowWarn) {
      return;
    }

    const formattedMessage = this.prepareMessageToLog(
      MESSAGE_TYPE.WARN,
      message,
    );

    this.logColoredMessage(
      TERMINAL_COLOR.YELLOW,
      MESSAGE_TYPE.WARN,
      formattedMessage,
      data,
    );
  }

  static error(message: string, data?: unknown, error?: unknown) {
    if (!this.shouldShowWarn) {
      return;
    }

    const formattedMessage = this.prepareMessageToLog(
      MESSAGE_TYPE.ERROR,
      message,
    );

    this.logColoredMessage(
      TERMINAL_COLOR.RED,
      MESSAGE_TYPE.ERROR,
      formattedMessage,
      data,
      error,
    );
  }

  private static prepareMessageToLog(
    messageType: MESSAGE_TYPE,
    message: string,
  ) {
    const date = format(new Date(), 'yyyy-MM-dd, HH:mm:ss');

    const formattedMessage = `[${date}] ${messageType}: ${message} `;
    return formattedMessage;
  }

  private static logColoredMessage(
    color: TERMINAL_COLOR,
    messageType: MESSAGE_TYPE,
    message: string,
    data?: unknown,
    error?: unknown,
  ) {
    const consoleFunctionNameToInvoke =
      messageType.toLowerCase() as CONSOLE_METHOD_KEY;

    if (data && error) {
      return console.error(
        `${color}%s${RESET_ATTRIBUTE}`,
        message,
        data,
        error,
      );
    }

    if (data) {
      return console[consoleFunctionNameToInvoke](
        `${color}%s${RESET_ATTRIBUTE}`,
        message,
        data,
      );
    }

    console[consoleFunctionNameToInvoke](
      `${color}%s${RESET_ATTRIBUTE}`,
      message,
    );
  }
}

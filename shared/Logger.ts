import {format} from 'date-fns';

const cyanColor = '\x1b[36m';
const resetAttributes = '\x1b[0m';

export default class Logger {
  static shouldShowInfo = true;
  static shouldShowWarn = true;
  static shouldShowError = true;

  static info(message: string, data?: unknown) {
    if (!this.shouldShowInfo) {
      return;
    }

    const date = format(new Date(), 'yyyy-MM-dd, HH:mm:ss');

    const formattedInfoMessage = `[${date}] INFO: ${message} `;

    if (data) {
      return console.info(
        `${cyanColor}%s${resetAttributes}`,
        formattedInfoMessage,
        data,
      );
    }

    console.info(`${cyanColor}%s${resetAttributes}`, formattedInfoMessage);
  }
}

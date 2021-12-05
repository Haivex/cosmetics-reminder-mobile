// import {format} from 'date-fns';
// import Colors from 'colors.ts';

// Colors.enable();

// export default class Logger {
//   static shouldShowInfo = true;
//   static shouldShowWarn = true;
//   static shouldShowError = true;

//   static info(message: string, data?: unknown) {
//     if (!this.shouldShowInfo) {
//       return;
//     }

//     Colors.theme({info: ['cyan', 'bgBlack']});

//     const date = format(new Date(), 'yyyy-MM-dd, HH:mm:ss');
//     const formattedInfoMessage = `%c[${date}] INFO: ${message} `.info;

//     // const formattedInfoMessage = `%c[${date}] INFO: ${message} `;
//     // const messageStyle = [
//     //   'color: cyan',
//     //   'background-color: #333',
//     //   'padding: 2px 4px',
//     //   'border-radius: 2px',
//     // ].join(';');

//     if (data) {
//       //return console.info(formattedInfoMessage, messageStyle, data);
//       return console.info(formattedInfoMessage, data);
//     }

//     //console.info(formattedInfoMessage, messageStyle);
//     console.info(formattedInfoMessage);
//   }
// }

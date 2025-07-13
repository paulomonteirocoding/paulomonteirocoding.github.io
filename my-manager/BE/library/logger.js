const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'warn', // só mostra warn e error
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'HH:mm:ss' }),
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
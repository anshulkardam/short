import { createLogger, format, transports, transport } from 'winston';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
import config from '@/config';

const transportation: transport[] = [];

if (!config.LOGTAIL_HOST || !config.LOGTAIL_TOKEN) {
  throw new Error('Logtail source token or host is missing');
}

const logtail = new Logtail(config.LOGTAIL_TOKEN, {
  endpoint: config.LOGTAIL_HOST,
});

if (config.NODE_ENV === 'production') {
  transportation.push(new LogtailTransport(logtail));
}

const { colorize, combine, timestamp, label, printf, metadata } = format;

if (config.NODE_ENV === 'development') {
  transportation.push(
    new transports.Console({
      format: combine(
        colorize({ all: true }),
        label({ label: `${config.NODE_ENV.toUpperCase()}-SERVER` }),
        timestamp({ format: 'DD MMMM hh:mm:ss A' }),
        metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
        printf(({ level, label, message, timestamp, metadata }) => {
          const metaStr =
            metadata && Object.keys(metadata).length
              ? `\n${JSON.stringify(metadata, null, 2)}`
              : '';

          return `${timestamp} [${label}] [${level}]: ${message} ${metaStr}`;
        })
      ),
    })
  );
}

const logger = createLogger({
  transports: transportation,
});

export { logtail, logger };

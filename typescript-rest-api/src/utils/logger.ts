import winston from 'winston';
import path from 'path';
import fs from 'fs';
import zlib from 'zlib';

const logDirectory = path.join(__dirname, '../../logs');
const archiveDirectory = path.join(logDirectory, 'tarlogs');

if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory);
if (!fs.existsSync(archiveDirectory)) fs.mkdirSync(archiveDirectory);

const compressLogFile = async (sourcePath: string, destinationPath: string) => {
  const gzip = zlib.createGzip();
  const sourceStream = fs.createReadStream(sourcePath);
  const destinationStream = fs.createWriteStream(destinationPath);
  sourceStream.pipe(gzip).pipe(destinationStream);

  await new Promise<void>((resolve, reject) => {
    destinationStream.on('close', resolve);
    destinationStream.on('error', reject);
  });
};

const moveAndCompressLog = async (filename: string) => {
  const filePath = path.join(logDirectory, filename);
  const timestamp = new Date().toISOString();
  const compressedFilePath = path.join(archiveDirectory, `${filename.split('.')[0]}-${timestamp}.log.gz`);

  await compressLogFile(filePath, compressedFilePath); 
  fs.unlinkSync(filePath); 
};

const ensureLogFileExists = (filename: string) => {
  const filePath = path.join(logDirectory, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, ''); 
  }
};

const transportOptions = {
  dirname: logDirectory,
  maxSize: '5m', //File log 5MB
  maxFiles: 5,   
  zippedArchive: false, 
};

const filterOnly = (level: string) =>
  winston.format((info) => (info.level === level ? info : false))();

const logger = winston.createLogger({
  level: 'error',  
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    // Log Trace
    new winston.transports.File({
      ...transportOptions,
      filename: path.join(logDirectory, 'trace.log'), 
      level: 'debug',  
      format: winston.format.combine(filterOnly('debug')),
    }),

    // Log Stream
    new winston.transports.File({
      ...transportOptions,
      filename: path.join(logDirectory, 'stream.log'), 
      level: 'info', 
      format: winston.format.combine(filterOnly('info')),
    }),

    // Log Error
    new winston.transports.File({
      ...transportOptions,
      filename: path.join(logDirectory, 'error.log'), 
      level: 'error',  
      format: winston.format.combine(filterOnly('error')),
    }),

    // Console log (log level error saja)
    new winston.transports.Console({
      level: 'error',
      format: winston.format.simple(),
    }),
  ],
});

ensureLogFileExists('trace.log');
ensureLogFileExists('stream.log');
ensureLogFileExists('error.log');

fs.watch(logDirectory, (eventType, filename) => {
  if (eventType === 'rename' && filename) {
    const validLogFiles = ['trace.log', 'stream.log', 'error.log'];
    if (validLogFiles.includes(filename)) {
      moveAndCompressLog(filename); 
    }
  }
});

export default logger;

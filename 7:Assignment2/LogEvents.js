// const fs = require('fs');
// const { v4: uuidv4 } = require('uuid');
// const { format } = require('date-fns');
// const path = require('node:path');
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import path from 'path';

const logEvents = async (message) => {
  // Define folder and file names
  const directory ='./'
  const folderName = path.join(directory, 'Logs');
  const fileName = 'eventLogs.txt';
  const logItem = `${uuidv4()} ${format(new Date(), 'yyyyMMdd\tHH:mm:ss')} ${message}\n`;

  // Check if the folder exists, create it if it doesn't
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName, { recursive: true });
  }

  // Append logItem to the file
  try {
    await fs.promises.appendFile(path.join(folderName, fileName), logItem);
    console.log('Log written:', logItem.trim());
  } catch (err) {
    console.error('Error writing log:', err);
  }
};

export default logEvents;

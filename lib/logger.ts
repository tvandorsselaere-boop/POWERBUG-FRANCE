const isDev = process.env.NODE_ENV === "development";

interface LogData {
  [key: string]: unknown;
}

function formatLog(level: string, message: string, data?: LogData): string {
  if (isDev) {
    const extra = data ? ` ${JSON.stringify(data)}` : "";
    return `[${level}] ${message}${extra}`;
  }
  return JSON.stringify({ level, message, ...data, timestamp: new Date().toISOString() });
}

export function logInfo(message: string, data?: LogData) {
  console.log(formatLog("info", message, data));
}

export function logError(message: string, data?: LogData) {
  console.error(formatLog("error", message, data));
}

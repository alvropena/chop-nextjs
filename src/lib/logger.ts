export const Logger = {
  debug: (...args: any[]) => {
    if (process.env.NEXT_PUBLIC_DEBUG_MODE === "true") {
      console.log(...args);
    }
  },
  info: (...args: any[]) => {
    if (process.env.NEXT_PUBLIC_DEBUG_MODE === "true") {
      console.info(...args);
    }
  },
  warn: (...args: any[]) => {
    if (process.env.NEXT_PUBLIC_DEBUG_MODE === "true") {
      console.warn(...args);
    }
  },
  error: (...args: any[]) => {
    if (process.env.NEXT_PUBLIC_DEBUG_MODE === "true") {
      console.error(...args);
    }
  },
};

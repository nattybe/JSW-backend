import fs from "fs";

// Function to log messages to a file
function writeToLog(message) {
  // Create or append to the log file
  fs.appendFile(
    "ServerLog.log",
    `${new Date().toISOString()}: ${message}\n`,
    (err) => {
      if (err) {
        console.error("Error writing to log file:", err);
      }
    }
  );
}
function viewLogFile() {
  try {
    const content = fs.readFileSync('ServerLog.log', "utf8");
    console.log(content);
  } catch (error) {
    console.error("Error reading log file:", error);
  }
}

// Example: Log a message
viewLogFile();
export {writeToLog}

import fs from "fs";
const logger = (req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        const log = `┌───────────────────────────────────────────────
│ Time       : ${new Date().toLocaleString()}
│ Method     : ${req.method}
│ URL        : ${req.originalUrl}
│ Status     : ${res.statusCode}
│ IP Address : ${req.ip}
│ User Agent : ${req.get("user-agent")}
│ Duration   : ${duration}ms
└───────────────────────────────────────────────

`;
        fs.appendFile("logger.txt", log, (err) => {
            if (err) {
                console.error("❌ Failed to write log:", err);
            }
        });
    });
    next();
};
export default logger;
//# sourceMappingURL=logger.js.map
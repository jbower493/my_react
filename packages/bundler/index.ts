import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { BundlerConfig } from "./types.js";

const rootDirPath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "../.."
);

const requestHandler:
    | http.RequestListener<
          typeof http.IncomingMessage,
          typeof http.ServerResponse
      >
    | undefined = (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });

    const bundlerConfigFilePath = path.join(rootDirPath, "bundler.config.json");
    const bundlerConfig = fs.readFileSync(bundlerConfigFilePath, {
        encoding: "utf-8",
    });
    const bundlerConfigObj = JSON.parse(bundlerConfig) as BundlerConfig;

    const entryFileContent = fs.readFileSync(
        path.join(rootDirPath, bundlerConfigObj.entryFile),
        { encoding: "utf-8" }
    );

    res.end(entryFileContent);
};

const server = http.createServer(requestHandler);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

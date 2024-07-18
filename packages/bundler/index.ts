import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { BundlerConfig, RequestHandler } from "./types.js";

const rootDirPath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "../.."
);

const requestHandler: RequestHandler = (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });

    const bundlerConfigFilePath = path.join(rootDirPath, "bundler.config.json");
    const bundlerConfig = fs.readFileSync(bundlerConfigFilePath, {
        encoding: "utf-8",
    });
    const bundlerConfigObj = JSON.parse(bundlerConfig) as BundlerConfig;

    const htmlEntryFilePath = path.join(
        rootDirPath,
        bundlerConfigObj.htmlEntryFile
    );
    const htmlEntryFileContent = fs.readFileSync(htmlEntryFilePath, {
        encoding: "utf-8",
    });

    const jsEntryFilePath = path.join(
        rootDirPath,
        bundlerConfigObj.jsEntryFile
    );
    const jsEntryFilePathRelativeToHtmlEntryFile =
        bundlerConfigObj.jsEntryFileRelative;
    // const jsEntryFileContent = fs.readFileSync(htmlEntryFilePath, {
    //     encoding: "utf-8",
    // });

    // Insert a scrip with src of js entry file into the html entry file before serving it

    const htmlContentBodyEndSplit = htmlEntryFileContent.split("</body>");
    const newHtmlContentArray = [
        htmlContentBodyEndSplit[0] +
            `    <script src="${jsEntryFilePathRelativeToHtmlEntryFile}"></script>\n`,
        htmlContentBodyEndSplit[1],
    ];
    const htmlEntryFileContentWithScript = newHtmlContentArray.join("</body>");

    res.end(htmlEntryFileContentWithScript);
};

const server = http.createServer(requestHandler);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}/`);
});

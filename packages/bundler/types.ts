import http from "node:http";

export type BundlerConfig = {
    htmlEntryFile: string;
    jsEntryFile: string;
    // TODO: remove this once I can calculate the relative path
    jsEntryFileRelative: string;
};

export type RequestHandler =
    | http.RequestListener<
          typeof http.IncomingMessage,
          typeof http.ServerResponse
      >
    | undefined;

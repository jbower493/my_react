import http from "node:http";

export type BundlerConfig = {
    entryFile: string;
};

export type RequestHandler =
    | http.RequestListener<
          typeof http.IncomingMessage,
          typeof http.ServerResponse
      >
    | undefined;

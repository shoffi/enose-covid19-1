import path from "path";
import * as url from "url";

const isDevelopment = process.env.NODE_ENV !== "production";

export default function getStatic(relativePath = "") {
    if (isDevelopment) {
      // console.log('Success ' + relativePath);
      return url.resolve(window.location.origin, relativePath);
    }
    return path.join(__dirname, '/static').replace(/\\/g, '\\\\');
  }
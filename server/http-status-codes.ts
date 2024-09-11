export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,

  getStatusText: function (code: number): string {
    switch (code) {
      case this.OK:
        return "OK";
      case this.CREATED:
        return "Created";
      case this.ACCEPTED:
        return "Accepted";
      case this.NO_CONTENT:
        return "No Content";
      case this.MOVED_PERMANENTLY:
        return "Moved Permanently";
      case this.FOUND:
        return "Found";
      case this.NOT_MODIFIED:
        return "Not Modified";
      case this.BAD_REQUEST:
        return "Bad Request";
      case this.UNAUTHORIZED:
        return "Unauthorized";
      case this.FORBIDDEN:
        return "Forbidden";
      case this.NOT_FOUND:
        return "Not Found";
      case this.METHOD_NOT_ALLOWED:
        return "Method Not Allowed";
      case this.CONFLICT:
        return "Conflict";
      case this.INTERNAL_SERVER_ERROR:
        return "Internal Server Error";
      case this.NOT_IMPLEMENTED:
        return "Not Implemented";
      case this.BAD_GATEWAY:
        return "Bad Gateway";
      case this.SERVICE_UNAVAILABLE:
        return "Service Unavailable";
      case this.GATEWAY_TIMEOUT:
        return "Gateway Timeout";
      default:
        return "Unknown Status";
    }
  },
} as const;

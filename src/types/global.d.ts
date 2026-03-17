// Global type declarations for React Native environment
declare global {
  var console: {
    log: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
    info: (...args: any[]) => void;
  };
  
  function fetch(input: string | Request, init?: RequestInit): Promise<Response>;
}

export {};

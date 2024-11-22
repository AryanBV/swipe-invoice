declare module 'pdf-parse' {
    function pdfParse(buffer: Buffer): Promise<{
      numpages: number;
      numrender: number;
      info: any;
      metadata: any;
      text: string;
      version: string;
    }>;
    export = pdfParse;
  }
  
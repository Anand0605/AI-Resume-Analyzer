declare module "pdf-parse" {
  function pdfParse(
    data: Buffer
  ): Promise<{
    text: string;
    numpages: number;
    info: any;
  }>;

  export default pdfParse;
}

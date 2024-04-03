class DBException extends Error {
  statusCode: number;

  constructor(message: string | undefined, code:number) {
    super(message);
    this.statusCode = code;
  }
}

export default DBException;

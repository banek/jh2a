export interface IBook {
  id?: number;
  naziv?: string;
}

export class Book implements IBook {
  constructor(public id?: number, public naziv?: string) {}
}

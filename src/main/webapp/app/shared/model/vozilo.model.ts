export interface IVozilo {
  id?: number;
  naziv?: string;
}

export class Vozilo implements IVozilo {
  constructor(public id?: number, public naziv?: string) {}
}

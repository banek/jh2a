export interface IParking {
  id?: number;
  naziv?: string;
  povrsina?: number;
}

export class Parking implements IParking {
  constructor(public id?: number, public naziv?: string, public povrsina?: number) {}
}

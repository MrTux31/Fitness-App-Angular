import { DatePipe } from "@angular/common";

export enum Status{
  ACTIVE = "active",
  INACTIVE = "inactive"
}


export class Routine {
  constructor(
    public id: number = 0,
    public name: string = '',
    public creationDate: string = '',
    public status: Status = Status.ACTIVE
  ) {}
}

export class GasModel
{
    constructor(
          public gasline?: number,
          public gasname?: string,
          public lower_limit?: number,
          public upper_limit?: number,
          public target?:number,
          public tool?: string,
          public Ac?: number,
          public Select?: boolean,
          public status?: string,
          public OldAio?: number,
          public NewAio?: number
          ) { }
}

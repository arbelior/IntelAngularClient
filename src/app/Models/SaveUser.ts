export class SaveUser
{
   public constructor(
       public username ? : string, 
       public jwt      ? : string,
       public RoleCommand? : string
    ){ }
}
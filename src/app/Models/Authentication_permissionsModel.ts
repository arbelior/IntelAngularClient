export class Authentication_permissionsModel
{
   public constructor(
       public id?: number,
       public first_name?: string, 
       public last_name?: string, 
       public user_name?: string, 
       public pass?:string,
       public role?: string,
       public jwt_token? :string,
       public _command?: string


   ){ }
}
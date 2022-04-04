export class TorqueModel
{
   public constructor(
    public id?: number,
    public module?: string, 
    public part?: string, 
    public torque?: string, 
    public route?: string,
    public chambar?: string,
    public pm?: string,
    public select?: boolean,
    public ShowTorqueDB = true

    ){ }
}
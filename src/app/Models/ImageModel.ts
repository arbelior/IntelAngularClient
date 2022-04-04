export class ImageModel
{
    constructor
    (
        public id?: number,
        public module?: string, 
        public task?: string, 
        public pM_Step?: string, 
        public imageLocation?: number,
        public description?: string,
        public part?: string,
        public torque?: string) { }
    
}
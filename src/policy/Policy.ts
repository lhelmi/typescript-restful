import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { IUser } from '../entity/User';
import { ResponseError } from '../error/ResponseError';


export class Policy{
    private user:IUser;
    private ability: string;
    private model: string;

    constructor(user:IUser, ability:string, model:string){
        this.user = user;
        this.ability = ability;
        this.model = model;
    }

    defineAbilitiesFor() {
        const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
        can('read', 'User');
        can('update', 'User', {user_id : this.user._id});
        return build();
    }

    checkAbillities(){
        const policies = this.defineAbilitiesFor();
        if(!policies.can(this.ability, this.model)){
            throw new ResponseError(403, "Forbidden");
        }
    }

}
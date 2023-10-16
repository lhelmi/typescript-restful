import { AbilityBuilder, AnyAbility, createMongoAbility } from '@casl/ability';
import { IUser } from '../entity/User';

class Policy{

  defineAbilitiesFor(user:IUser):AnyAbility {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
    
    // if(user && typeof this.policies[user.role] === 'function'){
    //   this.policies[user.role](user, build);
    // } else {
    //   this.policies['guest'](user, build);
    // }
    // can read blog posts
    // can('read', 'BlogPost');
    // can manage (i.e., do anything) own posts
    can('read', 'User', { user_id: user._id });
    // cannot delete a post if it was created more than a day ago
    // cannot('delete', 'BlogPost', {
    //   createdAt: { $lt: Date.now() - 24 * 60 * 60 * 1000 }
    // });

    return build();
  }
}

export default new Policy();
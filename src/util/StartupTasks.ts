import * as config from 'config';
import Parent from '../entity/Parent';
import ParentRepository from '../repository/ParentRepository';

interface IConfigParent {
  name: string;
  email: string;
}

export function initialize(context: ParentRepository): Promise<Parent[]> {
  const parents = config.get<IConfigParent[]>('parents');
  const parentsCreated = parents.map((parent) => context.findOrCreateNewParent( parent.email, parent.name));
  return Promise.all(parentsCreated);
}

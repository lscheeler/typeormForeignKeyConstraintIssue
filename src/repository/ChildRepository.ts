import { EntityRepository, Repository } from 'typeorm';
import Child from '../entity/Child';
import ParentRepository from './ParentRepository';

@EntityRepository(Child)
export default class ChildRepository extends Repository<Child> {

  public async findOrCreate(email: string, name: string, id: string): Promise<Child> {
    const parentRepo = this.manager.getCustomRepository(ParentRepository);
    const parent = await parentRepo.findOrCreateNewParent(email, name);
    const child = await this.findOneById(id) || new Child("test");
    child.parent = parent;
    return this.save(child);
  }

}
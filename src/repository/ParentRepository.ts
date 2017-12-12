import { EntityRepository, Repository } from 'typeorm';
import Parent from '../entity/Parent';

@EntityRepository(Parent)
export default class ParentRepository extends Repository<Parent> {

  public async findByEmail(providedEmail: string): Promise<Parent> {
    const possibleParent = await this.findOne({ email: providedEmail });
    if (possibleParent) {
      return possibleParent;
    } else {
      const searchPropertyValue = 'email';
      const error = new Error(`No user with ${searchPropertyValue} could be located.`);
      return Promise.reject(error);
    }
  }

  public async findOrCreateNewParent(email: string, name: string): Promise<Parent> {
    const cleanEmail = email.trim().toLowerCase();
    try {
      return await this.findByEmail(email);
    } catch {
      const newParentParams: Partial<Parent> = {
        name,
        email: cleanEmail,
      };
      const newParent = this.create(newParentParams);
      await this.manager.save(newParent);
      return newParent;
    }
  }

}

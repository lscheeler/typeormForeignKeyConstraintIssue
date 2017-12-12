"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Parent_1 = require("../entity/Parent");
let ParentRepository = class ParentRepository extends typeorm_1.Repository {
    // public async findById(providedId: string): Promise<User> {
    //   const possibleUser = await this.findOneById(providedId);
    //   if (possibleUser) {
    //     return possibleUser;
    //   } else {
    //     const searchPropertyValue = 'id';
    //     const error = new Error(`No user with ${searchPropertyValue} could be located.`);
    //     return Promise.reject(error);
    //   }
    // }
    async findByEmail(providedEmail) {
        const possibleParent = await this.findOne({ email: providedEmail });
        if (possibleParent) {
            return possibleParent;
        }
        else {
            const searchPropertyValue = 'email';
            const error = new Error(`No user with ${searchPropertyValue} could be located.`);
            return Promise.reject(error);
        }
    }
    async findOrCreateNewParent(email, name) {
        const cleanEmail = email.trim().toLowerCase();
        try {
            return await this.findByEmail(email);
        }
        catch (_a) {
            const newParentParams = {
                name,
                email: cleanEmail,
            };
            const newParent = this.create(newParentParams);
            await this.manager.save(newParent);
            return newParent;
        }
    }
};
ParentRepository = __decorate([
    typeorm_1.EntityRepository(Parent_1.default)
], ParentRepository);
exports.default = ParentRepository;
//# sourceMappingURL=ParentRepository.js.map
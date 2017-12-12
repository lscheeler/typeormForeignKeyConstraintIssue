"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Child_1 = require("../entity/Child");
const ParentRepository_1 = require("./ParentRepository");
//import * as uuid from 'uuid';
//import { CertificateSigningRequest } from '../models/CertificateSigningRequest';
//import * as CryptoHelper from '../util/CryptoHelper';
let ChildRepository = class ChildRepository extends typeorm_1.Repository {
    async findOrCreate(email, name, id) {
        const parentRepo = this.manager.getCustomRepository(ParentRepository_1.default);
        const parent = await parentRepo.findOrCreateNewParent(email, name);
        const child = await this.findOneById(id) || new Child_1.default("test");
        child.parent = parent;
        return this.save(child);
    }
};
ChildRepository = __decorate([
    typeorm_1.EntityRepository(Child_1.default)
], ChildRepository);
exports.default = ChildRepository;
//# sourceMappingURL=ChildRepository.js.map
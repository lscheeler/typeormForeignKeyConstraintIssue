import 'reflect-metadata';
import {Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToMany } from 'typeorm';
import Child from './Child';

@Entity()
export default class Parent {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public name: string;

    @Column({ unique: true })
    public email: string;

    @OneToMany((type) => Child, (child) => child.parent, { cascadeInsert: true, cascadeUpdate: true, eager: true })
    public children: Child[];

    @CreateDateColumn()
    public createdDate: Date;

    @UpdateDateColumn()
    public updatedDate: Date;

}

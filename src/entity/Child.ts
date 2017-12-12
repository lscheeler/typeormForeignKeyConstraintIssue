import 'reflect-metadata';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import Parent from './Parent';

@Entity()
export default class Child {
  @Column()
  public description: string;

  @PrimaryGeneratedColumn('uuid')
  public uniqueIdentifier: string;

  @ManyToOne((type) => Parent, (parent) => parent.children, { cascadeInsert: true, cascadeUpdate: true })
  public parent: Parent;

  @CreateDateColumn()
  public createdDate: Date;

  @UpdateDateColumn()
  public updatedDate: Date;

  constructor(description: string) {
    this.description = description;
  }

}

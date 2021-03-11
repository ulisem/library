import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, ManyToMany } from "typeorm";
import { Book } from "src/book/book.entity";


@Entity()
export class Author extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id:string;
    @Column()
    firstname:string;
    @Column()
    lastname:string;
    @Column()
    nacionality:string;
    @Column({type: 'timestamp'})
    birthdate:Date;
    @ManyToMany(type => Book, book => book.author, { eager: false, onDelete: "CASCADE"})
    book:Book[]; 


}
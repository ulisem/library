import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Author } from "src/author/Author.entity";
import { Loan } from "src/loan/Loan.entity";


@Entity()
@Unique(["isbn"])
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id:string;
    @Column()
    title:string;
    @Column()
    isbn:string;
    @Column()
    PublicationYear:number;
    @Column()
    edition:number;
    @Column()
    description:string;
    @Column()
    quantity:number;
    @Column()
    img:string;
    @Column({nullable:true})
    location:string;
    @ManyToMany(type => Author, author => author.book, {eager:true, onDelete: 'CASCADE'} )
    @JoinTable()
    author: Author[];
    @OneToMany(type => Loan, loan => loan.book, {eager:true, onDelete: 'CASCADE'})
    loan: Loan[];



}
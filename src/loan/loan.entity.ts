import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { statusLoan } from "./create-status";
import { Book } from "src/book/book.entity";
import { Reader } from "src/reader/reader.entity";


@Entity()
export class Loan extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id:string;
    @ManyToOne(type => Book, book => book.loan, { eager: false })
    book:Book;
    @PrimaryColumn()
    bookId:string;
    @ManyToOne(type => Reader, reader => reader.loan, { eager: false })
    reader:Reader;
    @PrimaryColumn()
    readerId:string;
    @Column()
    status:statusLoan;
    @Column({type: 'timestamp'})
    createdDate:Date;
    @Column({type: 'timestamp', nullable: true})
    aprobedDate:Date;
    @Column({type: 'timestamp',nullable: true})
    returnDate:Date;
    


}
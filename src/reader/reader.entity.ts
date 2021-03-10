import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, ManyToMany } from "typeorm";
import * as bctypt from "bcrypt";
import { Loan } from "src/loan/Loan.entity";



@Entity()
@Unique(['email'])
@Unique(['phoneNumber'])
export class Reader extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id:string;
    @Column()
    email:string;
    @Column()
    password:string;
    @Column()
    salt:string;
    @Column()
    firstname:string;
    @Column()
    lastname:string;
    @Column()
    createdDate:Date;
    @Column()
    phoneNumber:string;
    @Column()
    state:string;
    @Column()
    city:string;
    @Column()
    neigborhood:string;
    @Column()
    street:string;
    @Column()
    extnumber:string;
    @Column({nullable:true})
    intnumber:string;
    @Column({type: 'float'})
    debt:number;
    @Column()
    img:string;
    @OneToMany(type => Loan, loan => loan.book, {eager:false})
    loan: Loan[];


    

    async validatePassword(password: string):Promise<boolean>{
        const hash = await bctypt.hash(password, this.salt);
        return hash === this.password;
    }

}
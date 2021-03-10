import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, ManyToMany } from "typeorm";
import * as bctypt from "bcrypt";
import { roleAdmin } from "./create.role.admin";



@Entity()
@Unique(['email'])
@Unique(['phoneNumber'])
export class Admin extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id:number;
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
    @Column(  )
    createdDate:Date;
    @Column()
    phoneNumber:string;
    @Column()
    role:roleAdmin;


    

    async validatePassword(password: string):Promise<boolean>{
        const hash = await bctypt.hash(password, this.salt);
        return hash === this.password;
    }

}
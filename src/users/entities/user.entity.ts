import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string

    @Column()
    password: string

    @Column({default: 'user'})
    role: string

    async validatePassword(password:string): Promise<Boolean> {
        return bcrypt.compare(password, this.password)
    }
}

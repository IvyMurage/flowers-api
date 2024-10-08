import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Flower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  color: string;

  @Column({
    type: 'decimal',
    precision: 10,  
    scale: 2,  
  })
  price: number;

  @Column()
  stock: number;

  @Column({
    default: true,
  })
  onSale: boolean;

  @Column()
  type: string;

  @Column({
    type: 'text',
  })
  image_url: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Flower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column()
  onSale: boolean;

  @Column()
  type: string;

  @Column()
  image_url: string;
}

import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Products {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  image: string;
  @Column({ type: 'varchar', length: 255 })
  title: string;
  @Column({ type: 'text' })
  description: string;
  @Column({ type: 'varchar', length: 255 })
  colors: string;
  @Column({ type: 'varchar', length: 50 })
  price: number;
}

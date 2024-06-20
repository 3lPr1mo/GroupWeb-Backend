import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'longblob' })
  image: Buffer;
  @Column({ type: 'varchar', length: 255 })
  title: string;
  @Column({ type: 'text' })
  description: string;
  @Column({ type: 'varchar', length: 255 })
  colors: string;
  @Column({ type: 'varchar', length: 50 })
  price: number;
}

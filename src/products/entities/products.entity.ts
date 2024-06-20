import { Category } from 'src/category/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'longblob' })
  image: Buffer | string;
  @Column({ type: 'varchar', length: 255 })
  title: string;
  @Column({ type: 'text' })
  description: string;
  @Column({ type: 'varchar', length: 255 })
  colors: string;
  @Column({ type: 'varchar', length: 50 })
  price: number;
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}

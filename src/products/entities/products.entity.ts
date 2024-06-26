import { Category } from 'src/category/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 250 })
  image: string;
  @Column({ type: 'varchar', length: 255 })
  title: string;
  @Column({ type: 'text' })
  description: string;
  @Column({ type: 'varchar', length: 255 })
  colors: string;
  @Column({ type: 'varchar', length: 50 })
  price: number | string;
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}

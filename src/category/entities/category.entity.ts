import { Divisions } from 'src/divisions/entities/divisions.entity';
import { Products } from 'src/products/entities/products.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 120 })
  name: string;
  @OneToMany(() => Products, (products) => products.category)
  products: Products[];
  @ManyToOne(() => Divisions, (divisions) => divisions.category)
  division: Divisions;
  @ManyToOne(() => User, (user) => user.category)
  user: User;
}

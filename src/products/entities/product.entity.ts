import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    price: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date
}
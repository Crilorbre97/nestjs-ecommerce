import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Product } from "./entities/product.entity"
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) { }

    findAll(): Promise<Product[]> {
        return this.productRepository.find()
    }

    async findOne(id: number): Promise<Product | null> {
        const product = await this.productRepository.findOneBy({ id })

        if (!product) throw new NotFoundException('Product not found');

        return product
    }

    create(dto: CreateProductDto): Promise<Product> {
        const product = this.productRepository.create(dto)
        return this.productRepository.save(product)
    }

    async update(id: number, dto: UpdateProductDto): Promise<Product> {
        const product = await this.productRepository.findOneBy({ id })

        if (!product) throw new NotFoundException('Product not found');

        Object.assign(product, Object.fromEntries(
            Object.entries(dto).filter(([_, v]) => v !== undefined)
        ));
        return this.productRepository.save(product);
    }

    async delete(id: number): Promise<DeleteResult> {
        const product = await this.productRepository.findOneBy({ id })

        if (!product) throw new NotFoundException('Product not found');

        return this.productRepository.delete(id)
    }
}

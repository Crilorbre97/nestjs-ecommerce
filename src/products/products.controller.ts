import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from "./dto/create-product.dto"
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService){}

    @Get()
    findAll(){
        return this.productService.findAll()
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.productService.findOne(id)
    }

    @Post()
    create(@Body() dto: CreateProductDto){
        return this.productService.create(dto)
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto){
        return this.productService.update(id, dto)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
        return this.productService.delete(id)
    }
}

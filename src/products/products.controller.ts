import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { ProductService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return await this.productService.create(createProductDto);
    } catch (error) {
      throw new BadRequestException("Failed to create product");
    }
  }

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    const product = await this.productService.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    const updatedProduct = await this.productService.update(
      id,
      updateProductDto
    );
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  @Delete(":id")
  async remove(@Param("id") id: number) {
    const deletedProduct = await this.productService.remove(id);
    return { message: "Product deleted successfully" };
  }
}

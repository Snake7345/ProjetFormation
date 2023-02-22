import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe} from "@nestjs/common";
import {CategoriesService} from "./categories.service";
import {CategoriesDto} from "../shared/dto/categories/categories.dto";

// On appelle les méthodes à partir du service
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async GetAll() {
    return await this.categoriesService.getAll();
  }
  @Get(':id')
  async GetOne(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.findById(id);
  }

  /*Je ne comprends pas la validation whitelist*/
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Body() dto: CategoriesDto) {
    return await this.categoriesService.create(dto);
  }
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CategoriesDto,
  ) {
    return await this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.delete(id);
  }
}

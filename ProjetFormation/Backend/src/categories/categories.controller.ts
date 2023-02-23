import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import {CategoriesService} from "./categories.service";
import {CategoriesDto} from "../shared/dto/categories/categories.dto";
import {UpdatecategoriesDto} from "../shared/dto/categories/updatecategories.dto";
import {CategorieIdDto} from "../shared/dto/categories/categorieId.dto";

// On appelle les méthodes à partir du service
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async GetAll() {
    return await this.categoriesService.getAll();
  }


  @Get('updateCategories:id')
  async GetOne(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.findById(id);
  }

  /*Je ne comprends pas la validation whitelist*/
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('createcategorie')
  async create(@Body(ValidationPipe) dto: CategoriesDto) : Promise<CategoriesDto> {
    return await this.categoriesService.create(dto);
  }
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch(':id')
  async update(
      @Body(ValidationPipe) updateCategorie : UpdatecategoriesDto
  ) : Promise<CategoriesDto> {
    return await this.categoriesService.update(updateCategorie);
  }

  @Delete(':id')
  async delete(@Body(ValidationPipe) deleteCategorie : CategorieIdDto) : Promise<UpdatecategoriesDto> {
    return await this.categoriesService.delete(deleteCategorie);
  }
}

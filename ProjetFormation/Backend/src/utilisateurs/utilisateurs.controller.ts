import { Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { UtilisateursService } from "./utilisateurs.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Utilisateurs")
@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {
  }
  @Get()
  getAllUtilisateurs(@Param("userId", ParseIntPipe) userId : number) : Promise<any>
  {
    return this.gardensServe.getAllGardens(userId)
  }


  @Get(":gardenId")
  getOneGardensById(
    @Param("userId", ParseIntPipe) userId : number,
    @Param('gardenId', ParseIntPipe) gardenId : number
  ) : Promise<any>
  {
    return this.gardensServe.getOneGardensById(userId, gardenId)
  }


  @Post()
  createGardens(
    @Param("userId", ParseIntPipe) userId : number,
    @Body(ValidationPipe) newGarden : NewGardensDTO
  ) : Promise<any>
  {
    return this.gardensServe.createGardens(userId, newGarden)
  }


  @Patch(":gardenId")
  updateGardens(
    @Param("userId", ParseIntPipe) userId : number,
    @Param('gardenId', ParseIntPipe) gardenId : number,
    @Body(ValidationPipe) updateGarden : UpdateGardensDTO
  ) : Promise<any>
  {
    return this.gardensServe.updateGardens(userId, gardenId, updateGarden)
  }


  @Delete(":gardenId")
  deleteOneGardens(
    @Param("userId", ParseIntPipe) userId : number,
    @Param('gardenId', ParseIntPipe) gardenId : number
  ) : Promise<any>
  {
    return this.gardensServe.deleteGardens(userId, gardenId)
  }
}
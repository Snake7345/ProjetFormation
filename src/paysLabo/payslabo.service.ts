import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageDto } from "../common/message.dto";
import { PayslaboEntity } from "./payslabo.entity";
import { Repository } from "typeorm";

@Injectable()
export class PayslaboService {
  constructor(
    @InjectRepository(PayslaboEntity)
    private payslaboRepository: Repository<PayslaboEntity>,
  ) {
  }

  async getAll(): Promise<PayslaboEntity[]> {
    const list = await this.payslaboRepository.find({
      relations: ['FK_idValeursLabo'],
      order: {
        FK_idValeursLabo: {
          valeur: "DESC"
        }
      }
    });
    if (!list.length) {
      throw new NotFoundException(
        new MessageDto('Server : list is empty'),
      );
    }
    console.log(list)
    return list;
  }
}
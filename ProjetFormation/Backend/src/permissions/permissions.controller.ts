import { Controller } from "@nestjs/common";
import { PermissionsService } from "./permissions.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Permissions")
@Controller('permissions')
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) {
    }
}
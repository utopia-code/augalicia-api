import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Auth } from './../auth/decorators/auth.decorator';
import { ActiveUser } from './../common/decorators/active-user.decorator';
import { Role } from './../common/enums/role.enum';
import { ActiveUserInterface } from './../common/interfaces/active-user.interface';
import { AccesibilityDto } from './dtos/accesibility.dto';
import { ComplementaryTechniqueDto } from './dtos/complementary-technique.dto';
import { ServiceDto } from './dtos/service.dto';
import { TermalTechniqueDto } from './dtos/termal-technique.dto';
import { TreatmentDto } from './dtos/treatment.dto';
import { TypeProductDto } from './dtos/type-product.dto';
import { TypeTermalCentreDto } from './dtos/type-termal-centre.dto';
import { TypeWaterDto } from './dtos/type-water.dto';
import { FiltersService } from './filters.service';

@Controller('filters')
export class FiltersController {
    constructor(
        private filtersService: FiltersService
    ) {}

    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
      description: 'Unauthorized Bearer Auth'
    })
    @Auth(Role.ADMIN)
    @Post('type-product')
    createTypeProduct(
        @Body() typeProductDto: TypeProductDto,
        @ActiveUser() user: ActiveUserInterface
    ) {
        return this.filtersService.createTypeProduct(typeProductDto, user)
    }

    @Get('type-product')
    getAllTypeProducts() {
        return this.filtersService.getAllTypeProducts();
    }

    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth'
    })
    @Auth(Role.ADMIN)
    @Post('type-termal-centre')
    createTypeTermalCentre(
        @Body() typeTermalCentreDto: TypeTermalCentreDto,
        @ActiveUser() user: ActiveUserInterface
    ) {
        return this.filtersService.createTypeTermalCentre(typeTermalCentreDto, user)
    }

    @Get('type-termal-centre')
    getAllTypeTermalCentres() {
        return this.filtersService.getAllTypeTermalCentres();
    }

    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth'
    })
    @Auth(Role.ADMIN)
    @Post('termal-technique')
    createTermalTechnique(
        @Body() termalTechniqueDto: TermalTechniqueDto,
        @ActiveUser() user: ActiveUserInterface
    ) {
        return this.filtersService.createTermalTechnique(termalTechniqueDto, user)
    }

    @Get('termal-technique')
    getAllTermalTechniques() {
        return this.filtersService.getAllTermalTechniques();
    }

    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth'
    })
    @Auth(Role.ADMIN)
    @Post('type-water')
    createTypeWater(
        @Body() typeWaterDto: TypeWaterDto,
        @ActiveUser() user: ActiveUserInterface
    ) {
        return this.filtersService.createTypeWater(typeWaterDto, user);
    }

    @Get('type-water')
    getAllTypeWaters() {
        return this.filtersService.getAllTypeWaters();
    }

    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth'
    })
    @Auth(Role.ADMIN)
    @Post('treatment')
    createTreatment(
        @Body() treatmentDto: TreatmentDto,
        @ActiveUser() user: ActiveUserInterface
    ) {
        return this.filtersService.createTreatment(treatmentDto, user);
    }

    @Get('treatment')
    getAllTreatments() {
        return this.filtersService.getAllTreatments();
    }

    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth'
    })
    @Auth(Role.ADMIN)
    @Post('service')
    createService(
        @Body() serviceDto: ServiceDto,
        @ActiveUser() user: ActiveUserInterface
    ) {
        return this.filtersService.createService(serviceDto, user);
    }

    @Get('service')
    getAllServices() {
        return this.filtersService.getAllServices();
    }

    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth'
    })
    @Auth(Role.ADMIN)
    @Post('accesibility')
    createAccesibility(
        @Body() accesibilityDto: AccesibilityDto,
        @ActiveUser() user: ActiveUserInterface
    ) {
        return this.filtersService.createAccesibility(accesibilityDto, user);
    }

    @Get('accesibility')
    getAllAccesibility() {
        return this.filtersService.getAllAccesibility();
    }

    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth'
    })
    @Auth(Role.ADMIN)
    @Post('complementary-technique')
    createComplementaryTechnique(
        @Body() complementaryTechniqueDto: ComplementaryTechniqueDto,
        @ActiveUser() user: ActiveUserInterface
    ) {
        return this.filtersService.createComplementaryTechnique(complementaryTechniqueDto, user);
    }

    @Get('complementary-technique')
    getAllComplementaryTechniques() {
        return this.filtersService.getAllComplementaryTechniques();
    }
}

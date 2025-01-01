import { Body, Controller, Delete, Get, Param, Patch, Post, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Auth } from './../auth/decorators/auth.decorator';
import { ActiveUser } from './../common/decorators/active-user.decorator';
import { Role } from './../common/enums/role.enum';
import { ActiveUserInterface } from './../common/interfaces/active-user.interface';
import { Serialize } from './../interceptors/serialize.interceptor';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductDto } from './dtos/product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductsService } from './products.service';


@Serialize(ProductDto)
@Controller('products')
export class ProductsController {
    constructor(
        private productsService: ProductsService
    ) {}

    @Post()
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'Unauthorized Bearer Auth'
    })
    @Auth(Role.ADMIN)
    createProduct(
        @Body() createProductDto: CreateProductDto,
        @ActiveUser() user: ActiveUserInterface
    ) {
        if (!user) {
            throw new UnauthorizedException('User not authenticated');
        }
        return this.productsService.createProduct(createProductDto, user);
    }

    @Get('products-by-user')
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'Unauthorized Bearer Auth'
    })
    @Auth(Role.ADMIN)
    findAllProductsByUser(@ActiveUser() user: ActiveUserInterface) {
        return this.productsService.findAllProductsByUser(user);
    }

    @Get('/:id/product-by-user')
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'Unauthorized Bearer Auth'
    })
    @Auth(Role.ADMIN)
    findOneProductByUserWithRelations(
        @Param('id') id: string, 
        @ActiveUser() user: ActiveUserInterface
    ) {
        return this.productsService.findOneProductByUserWithRelations(parseInt(id), user);
    }

    @Patch('/:id')
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'Unauthorized Bearer Auth'
    })
    @Auth(Role.ADMIN)
    updateProduct(
        @Param('id') id: string, 
        @Body() updateProductDto: UpdateProductDto,
        @ActiveUser() user: ActiveUserInterface 
    ) {
        return this.productsService.updateProduct(parseInt(id), updateProductDto, user);
    }

    @Delete('/:id')
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'Unauthorized Bearer Auth'
    })
    @Auth(Role.ADMIN)
    removeProduct(
        @Param('id') id: string,
        @ActiveUser() user: ActiveUserInterface
    ) {
        return this.productsService.removeProduct(parseInt(id), user);
    }

    @Get('/:id')
    getProductById(@Param('id') id: string) {
        return this.productsService.getProductById(parseInt(id));
    }

    @Get('termal-technique/:id/product')
    getTermalTechniquesOfProductById(@Param('id') id: string) {
        return this.productsService.getTermalTechniquesOfProductById(parseInt(id));
    }

    @Get('treatment/:id/product')
    getTreatmentsOfProductById(@Param('id') id: string) {
        return this.productsService.getTreatmentsOfProductById(parseInt(id));
    }

    @Get('service/:id/product')
    getServicesOfProductById(@Param('id') id: string) {
        return this.productsService.getServicesOfProductById(parseInt(id));
    }

    @Get('accesibility/:id/product')
    getAccesibilityOfProductById(@Param('id') id: string) {
        return this.productsService.getAccesibilityOfProductById(parseInt(id));
    }

    @Get('complementary-technique/:id/product')
    getComplementaryTechniquesOfProductById(@Param('id') id: string) {
        return this.productsService.getComplementaryTechniquesOfProductById(parseInt(id));
    }

    @Get()
    findAllProducts() {
        return this.productsService.findAllProducts();
    }

    @Get('type-product/:id')
    getAllProductsByTypeProduct(@Param('id') id: string) {
        return this.productsService.findAllProductsByTypeProduct(parseInt(id));
    }

    @Get('type-termal-centre/:id')
    findAllProductsByTypeTermalCentre(@Param('id') id: string) {
        return this.productsService.findAllProductsByTypeTermalCentre(parseInt(id));
    }

    @Get('termal-technique/:id')
    getAllProductsByTermalTechnique(@Param('id') id: string) {
        return this.productsService.findAllProductsByTermalTechnique(parseInt(id));
    }

    @Get('type-water/:id')
    getAllProductsByTypeWater(@Param('id') id: string) {
        return this.productsService.findAllProductsByTypeWater(parseInt(id));
    } 

    @Get('treatment/:id')
    getAllProductsByTreatment(@Param('id') id: string) {
        return this.productsService.findAllProductsByTreatment(parseInt(id));
    }

    @Get('service/:id')
    getAllProductsByService(@Param('id') id: string) {
        return this.productsService.findAllProductsByService(parseInt(id));
    }

    @Get('accesibility/:id')
    getAllProductsByAccesibility(@Param('id') id: string) {
        return this.productsService.findAllProductsByAccesibility(parseInt(id));
    }

    @Get('complementary-technique/:id')
    getAllProductsByComplementaryTechnique(@Param('id') id: string) {
        return this.productsService.findAllProductsByComplementaryTechnique(parseInt(id));
    }
}

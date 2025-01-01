import { Controller, Get, Query } from "@nestjs/common";
import { NearbyProductsDto } from "./../nearbyProducts/nearby-products.dto";
import { NearbyProductsService } from "./nearbyProducts.service";

@Controller('nearby-products')
export class NearbyProductsController {
    constructor(
        private nearbyProductsService: NearbyProductsService
    ) {}

    @Get()
    async getNearbyProducts(@Query() query: NearbyProductsDto) {
        query.lat = parseFloat(query.lat as unknown as string);
        query.lng = parseFloat(query.lng as unknown as string);
        query.distanceKm = parseFloat(query.distanceKm as unknown as string);
        
        return this.nearbyProductsService.getProductsNearby(query.lat,  query.lng, query.distanceKm);
    }
}

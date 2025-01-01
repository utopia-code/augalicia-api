import { Injectable } from "@nestjs/common";
import { NearbyProductsRepository } from "./nearbyProducts.repository";

@Injectable()
export class NearbyProductsService {
    constructor(
        private nearbyProductsRepository: NearbyProductsRepository
    ) {}

    async getProductsNearby(lat: number, lng: number, distanceKm: number) {
        return await this.nearbyProductsRepository.getProductsNearby(lat, lng, distanceKm)
    }
}
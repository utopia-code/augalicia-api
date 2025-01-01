import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./../products/products.repository";

@Injectable()
export class NearbyProductsRepository {
    constructor(
        private productsRepository: ProductsRepository
    ) {}

    async getProductsNearby(lat: number, lon: number, distanceKm: number) {
        if (isNaN(lat) || isNaN(lon) || isNaN(distanceKm)) {
            throw new Error('Invalid coordinates or distance provided');
        }

        const products = await this.productsRepository.getProductsExcludingTermalWater();

        const nearbyProducts = products.filter(product => {
            const [productLat, productLon] = product.coordinates.split(',').map(Number);

            const distance = this.calculateHaversine(lat, lon, productLat, productLon);

            return distance <= distanceKm;
        });

        return nearbyProducts;
    }

    private calculateHaversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371;
        const dLat = this.degreesToRadians(lat2 - lat1);
        const dLon = this.degreesToRadians(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    private degreesToRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

}
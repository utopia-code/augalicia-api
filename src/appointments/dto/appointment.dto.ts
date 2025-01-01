import { Expose } from "class-transformer";
import { ProductDto } from "./../../products/dtos/product.dto";

export class AppointmentDto {
    @Expose()
    id: number;

    @Expose()
    date: string;

    @Expose()
    hour: string;

    @Expose()
    price: number;

    @Expose()
    max_capacity: number;

    @Expose()
    booked_count: number;

    @Expose()
    is_booked: boolean;

    @Expose()
    productId: number;

    @Expose()
    product: ProductDto
}
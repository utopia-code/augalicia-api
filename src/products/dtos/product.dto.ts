import { Expose, Type } from "class-transformer";
import { AppointmentDto } from "./../../appointments/dto/appointment.dto";
import { ImageResDto } from "./../../features/dtos/image-res.dto";
import { NotificationResDto } from "./../../features/dtos/notification-res.dto";
import { OpeningSeasonResDto } from "./../../features/dtos/opening-season-res.dto";
import { AccesibilityResDto } from "./../../filters/dtos/accesibility-res.dto";
import { ComplementaryTechniqueResDto } from "./../../filters/dtos/complementary-technique-res.dto";
import { ServiceResDto } from "./../../filters/dtos/service-res.dto";
import { TermalTechniqueResDto } from "./../../filters/dtos/termal-technique-res.dto";
import { TreatmentResDto } from "./../../filters/dtos/treatment-res.dto";
import { TypeProductResDto } from "./../../filters/dtos/type-product-res.dto";
import { TypeTermalCentreeResDto } from "./../../filters/dtos/type-termal-centre-res.dto";
import { TypeWaterResDto } from "./../../filters/dtos/type-water-res.dto";

export class ProductDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    tel: string;

    @Expose()
    email: string;

    @Expose()
    web: string;

    @Expose()
    address: string;

    @Expose()
    cp: string;

    @Expose()
    location: string;

    @Expose()
    desc: string;

    @Expose()
    coordinates: string;

    @Expose()
    @Type(() => TypeProductResDto)
    typeProduct: TypeProductResDto;

    @Expose()
    @Type(() => TypeTermalCentreeResDto)
    typeTermalCentre: TypeTermalCentreeResDto;

    @Expose()
    @Type(() => TermalTechniqueResDto)
    termalTechniques: TermalTechniqueResDto[];

    @Expose()
    @Type(() => TypeWaterResDto)
    typeWaters: TypeWaterResDto[];

    @Expose()
    @Type(() => TreatmentResDto)
    treatments: TreatmentResDto[];

    @Expose()
    @Type(() => ServiceResDto) 
    services: ServiceResDto[];

    @Expose()
    @Type(() => AccesibilityResDto)
    accesibility: AccesibilityResDto[];

    @Expose()
    @Type(() => ComplementaryTechniqueResDto)
    complementaryTechniques: ComplementaryTechniqueResDto[];

    @Expose()
    @Type(() => OpeningSeasonResDto)
    openingSeason: OpeningSeasonResDto[];

    @Expose()
    ageRequirement: number;

    @Expose()
    temperature: number;

    @Expose()
    @Type(() => ImageResDto)
    images: ImageResDto[];

    @Expose()
    @Type(() => NotificationResDto)
    notifications: NotificationResDto[];

    @Expose()
    @Type(() => AppointmentDto)
    appointments: AppointmentDto[]
}
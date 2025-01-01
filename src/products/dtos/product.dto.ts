import { Expose, Type } from "class-transformer";
import { AppointmentDto } from "src/appointments/dto/appointment.dto";
import { ImageResDto } from "src/features/dtos/image-res.dto";
import { NotificationResDto } from "src/features/dtos/notification-res.dto";
import { OpeningSeasonResDto } from "src/features/dtos/opening-season-res.dto";
import { AccesibilityResDto } from "src/filters/dtos/accesibility-res.dto";
import { ComplementaryTechniqueResDto } from "src/filters/dtos/complementary-technique-res.dto";
import { ServiceResDto } from "src/filters/dtos/service-res.dto";
import { TermalTechniqueResDto } from "src/filters/dtos/termal-technique-res.dto";
import { TreatmentResDto } from "src/filters/dtos/treatment-res.dto";
import { TypeProductResDto } from "src/filters/dtos/type-product-res.dto";
import { TypeTermalCentreeResDto } from "src/filters/dtos/type-termal-centre-res.dto";
import { TypeWaterResDto } from "src/filters/dtos/type-water-res.dto";

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
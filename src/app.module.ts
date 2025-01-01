import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule } from './appointments/appointments.module';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { FavouritesModule } from './favourites/favourites.module';
import { FeaturesModule } from './features/features.module';
import { FiltersModule } from './filters/filters.module';
import { NearbyProductsModule } from './nearbyProducts/nearby-products.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: false,
      ssl: process.env.POSTGRES_SSL === "true",
      extra: {
        ssl:
        process.env.POSTGRES_SSL === "true"
            ? {
                rejectUnauthorized: false,
              }
            : null,
      },
    }),
    UsersModule, 
    ProductsModule, 
    AuthModule,
    FiltersModule,
    FeaturesModule,
    BookingsModule,
    FavouritesModule,
    AppointmentsModule,
    NearbyProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

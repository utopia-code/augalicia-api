import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Está funcinando la base de datos de AuGalicia';
  }
}

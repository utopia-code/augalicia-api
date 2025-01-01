import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { unlink } from 'fs/promises';
import * as multer from 'multer';
import { join } from 'path';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { ImageDto } from './dtos/image.dto';
import { NotificationDto } from './dtos/notification.dto';
import { OpeningSeasonDto } from './dtos/opening-season.dto';
import { FeaturesService } from './features.service';

@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth'
})
@Auth(Role.ADMIN)
@Controller('features')
export class FeaturesController {
    constructor(
        private featuresService: FeaturesService
    ) {}

    @Post('opening-season')
    createOpeningSeason(
        @Body() openingSeasonDto: OpeningSeasonDto,
        @ActiveUser() user: ActiveUserInterface
    ) {
        return this.featuresService.createOpeningSeason(openingSeasonDto, user)
    }

    @Get('opening-season')
    getAllOpeningSeasons(@ActiveUser() user: ActiveUserInterface) {
        return this.featuresService.getAllOpeningSeasons(user);
    }

    @Post('upload-image')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: multer.diskStorage({
                destination: './public',
                filename: (res, file, cb) => {
                    try {
                        const filename = `${Date.now()}-${file.originalname}`;
                        cb(null, filename)
                    } catch (error) {
                        cb(
                            new HttpException(
                                'Failed to generate filename',
                                HttpStatus.INTERNAL_SERVER_ERROR,
                            ),
                            null
                        )
                    }
                }
            })
        }
    ))
    uploadFile(
        @UploadedFile() file,
        @ActiveUser() user: ActiveUserInterface
    ) {
        try {
            const fileSizeInBytes = file.size;
            const fileSizeInKilobytes = fileSizeInBytes / 1024;
            const fileSizeInMegabytes = fileSizeInKilobytes / 1024;
            return {
                filename: file.filename,
                simpleName: file.originalname.split('-')[1],
                url: `/${file.path}`,
                size: {
                    bytes: fileSizeInBytes,
                    kilobytes: fileSizeInKilobytes.toFixed(2),
                    megabytes: fileSizeInMegabytes.toFixed(2)
                }
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @Delete('delete-preview/:filename')
    async deletePreview(
        @Param('filename') filename: string,
        @ActiveUser() user: ActiveUserInterface
    ) {
        try {
            const filePath = join(__dirname, '..', '..', 'public', filename);

            await unlink(filePath);
            
            return { message: `File ${filename} deleted successfully` };

        } catch (error) {
            console.error('Error deleting file:', error);
            throw new HttpException(
                'Failed to delete file',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Delete('delete-image/:productId/:filename')
    async deleteFile(
        @Param('filename') filename: string,
        @ActiveUser() user: ActiveUserInterface,
        @Param('productId') productId: string
    ) {
        try {
            const image = await this.featuresService.getImageByName(filename, parseInt(productId), user);
            if (image) {
                await this.featuresService.deleteImageByName(filename, parseInt(productId), user);
            } else {
                console.log(`Image ${filename} not found in database. Skipping database deletion.`);
            }

            const filePath = join(__dirname, '..', '..', 'public', filename);

            await unlink(filePath);
            
            return { message: `File ${filename} deleted successfully` };

        } catch (error) {
            console.error('Error deleting file:', error);
            throw new HttpException(
                'Failed to delete file',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Post('image')
    createImage(
        @Body() imageDto: ImageDto,
        @ActiveUser() user: ActiveUserInterface
    ) {
        return this.featuresService.createImage(imageDto, user);
    }

    @Get('images/:id/product')
    getAllImagesByProduct(
        @Param('id') id: string,
        @ActiveUser() user: ActiveUserInterface
    ) {
        return this.featuresService.getAllImagesByProduct(parseInt(id), user);
    }

    @Post('notification')
    createNotification(
        @Body() notificationDto: NotificationDto,
        @ActiveUser() user: ActiveUserInterface
    ) {
        return this.featuresService.createNotification(notificationDto, user);
    }

    @Get('notifications/:id/product')
    getAllNotificationsByProduct(
        @Param('id') id: string,
        @ActiveUser() user: ActiveUserInterface
    ) {
        return this.featuresService.getAllNotificationsByProduct(parseInt(id), user);
    }

    @Delete('delete-notification/:productId/:id')
    async deleteNotification(
        @Param('id') id: string,
        @Param('productId') productId: string,
        @ActiveUser() user: ActiveUserInterface
    ) {
        return this.featuresService.deleteNotification(parseInt(id), parseInt(productId), user)
    }
}

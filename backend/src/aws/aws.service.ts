import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class AwsService {
  constructor(private configService: ConfigService) {}

  private readonly bucketName: string =
    this.configService.get('AWS_BUCKET_NAME');
  private readonly s3: S3 = new S3({
    accessKeyId: this.configService.get('ACCESS_ID'),
    secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
  });

  async uploadPublicFile(
    dataBuffer: Buffer,
    filename: string,
  ): Promise<{ success: number; url: string }> {
    try {
      const uploadResult = await this.s3
        .upload({
          Bucket: this.bucketName,
          Body: dataBuffer,
          Key: filename,
          ACL: 'public-read',
          ContentDisposition: 'inline',
        })
        .promise();

      // Возвращаем JSON-ответ с полем "success" и URL-адресом загруженного файла
      return { success: 1, url: uploadResult.Location };
    } catch (error) {
      console.log(error);
      // В случае ошибки, возвращаем JSON-ответ с полем "success" равным 0
      throw new Error('Ошибка при загрузке файла');
    }
  }

  async deletePublicFile(fileKey: string): Promise<void> {
    try {
      await this.s3
        .deleteObject({
          Bucket: this.bucketName,
          Key: fileKey,
        })
        .promise();
    } catch (error) {
      console.log(error);
      throw new Error('Ошибка при удалении файла');
    }
  }
}

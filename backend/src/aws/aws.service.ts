import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AwsService {
  constructor(private configService: ConfigService) {}

  private readonly bucketName: string = 'uajournal-post';
  private readonly bucketNameVideo: string = 'uajournal-post-video';
  private readonly s3: S3 = new S3({
    accessKeyId: this.configService.get('ACCESS_ID'),
    secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
  });

  async uploadPublicFile(
    dataBuffer: Buffer,
    filename: string,
    contentType: string,
  ): Promise<{ success: number; url: string; type: string }> {
    try {
      const bucket = contentType.startsWith('video/')
        ? this.bucketNameVideo
        : this.bucketName;

      // Генерируем случайное имя файла с помощью uuid
      const randomFilename = `${uuidv4()}-${filename}`;

      const uploadResult = await this.s3
        .upload({
          Bucket: bucket,
          Body: dataBuffer,
          Key: randomFilename,
          ACL: 'public-read',
          ContentType: contentType,
        })
        .promise();

      // Возвращаем JSON-ответ с полями "success", "url" и "type"
      return { success: 1, url: uploadResult.Location, type: contentType };
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

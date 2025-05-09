import * as uuid from "uuid";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import { Express } from "express";

@Injectable()
export class FileService {
  async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      const fileName = uuid.v4() + ".jpg";
      const filePath = path.resolve(__dirname, "../..", "static");
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      if (!file || !file.buffer) {
        throw new InternalServerErrorException({
          message: "Invalid file object or missing buffer",
        });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        message: "Error downloading file",
      });
    }
  }
}

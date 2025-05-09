import { PartialType } from '@nestjs/mapped-types';
import { CreateLabtestDto } from './create-labtest.dto';

export class UpdateLabtestDto extends PartialType(CreateLabtestDto) {}

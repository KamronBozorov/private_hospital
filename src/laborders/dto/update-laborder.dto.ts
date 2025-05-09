import { PartialType } from '@nestjs/mapped-types';
import { CreateLaborderDto } from './create-laborder.dto';

export class UpdateLaborderDto extends PartialType(CreateLaborderDto) {}

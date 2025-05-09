import { PartialType } from '@nestjs/mapped-types';
import { CreatePrescriptionMedicationDto } from './create-prescription_medication.dto';

export class UpdatePrescriptionMedicationDto extends PartialType(CreatePrescriptionMedicationDto) {}

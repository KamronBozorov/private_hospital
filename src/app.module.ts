import { Module } from "@nestjs/common";
import { BillsModule } from "./bills/bills.module";
import { PatientsModule } from "./patients/patients.module";
import { LabordersModule } from "./laborders/laborders.module";
import { LabtestsModule } from "./labtests/labtests.module";
import { MedicalrecordsModule } from "./medicalrecords/medicalrecords.module";
import { VisitsModule } from "./visits/visits.module";
import { BedsModule } from "./beds/beds.module";
import { RoomsModule } from "./rooms/rooms.module";
import { PrescriptionsModule } from "./prescriptions/prescriptions.module";
import { PrescriptionMedicationsModule } from "./prescription_medications/prescription_medications.module";
import { MedicationsModule } from "./medications/medications.module";
import { DoctorsModule } from "./doctors/doctors.module";
import { StaffsModule } from "./staffs/staffs.module";
import { DepartmentsModule } from "./departments/departments.module";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Bed } from "./beds/models/bed.model";
import { Bill } from "./bills/models/bill.model";
import { Department } from "./departments/models/department.model";
import { Doctor } from "./doctors/models/doctor.model";
import { LabOrder } from "./laborders/models/laborder.model";
import { LabTest } from "./labtests/models/labtest.models";
import { MedicalRecord } from "./medicalrecords/models/medicalrecord.model";
import { Medication } from "./medications/models/medication.model";
import { Patient } from "./patients/models/patient.model";
import { PrescriptionMedication } from "./prescription_medications/models/prescription_medication.model";
import { Prescription } from "./prescriptions/models/prescription.model";
import { Room } from "./rooms/models/room.model";
import { Staff } from "./staffs/models/staff.model";
import { Visit } from "./visits/models/visit.model";
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/user.model";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "static"),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        Bed,
        Bill,
        Department,
        Doctor,
        LabOrder,
        LabTest,
        MedicalRecord,
        Medication,
        Patient,
        PrescriptionMedication,
        Prescription,
        Room,
        Staff,
        Visit,
        User,
      ],
      autoLoadModels: true,
      sync: {
        alter: true,
      },
      logging: false,
    }),
    BillsModule,
    PatientsModule,
    LabordersModule,
    LabtestsModule,
    MedicalrecordsModule,
    VisitsModule,
    BedsModule,
    RoomsModule,
    PrescriptionsModule,
    PrescriptionMedicationsModule,
    MedicationsModule,
    DoctorsModule,
    StaffsModule,
    DepartmentsModule,
    UsersModule,
    AuthModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

export default `
import { Module } from "@nestjs/common";
import { FrontController } from "./front.controller";
import { FrontService } from "./front.service";
import { MulterModule } from "@nestjs/platform-express";
import { multerStorage } from "@utils";

@Module({
	imports: [
		MulterModule.register({
			storage: multerStorage("uploads"),
		}),
	],
	controllers: [FrontController],
	providers: [FrontService],
})
export class FrontModule {}
`;

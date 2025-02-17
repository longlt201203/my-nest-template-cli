export default `
import {
	Controller,
	FileTypeValidator,
	ForbiddenException,
	Headers,
	ParseFilePipe,
	Post,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { FrontService } from "./front.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { SkipAuth } from "@modules/auth";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { ApiResponseDto, Env } from "@utils";
import { DeployDto } from "./dto";

@Controller("front")
@SkipAuth()
export class FrontController {
	constructor(private readonly frontService: FrontService) {}

	@Post()
	@ApiConsumes("multipart/form-data")
	@ApiBody({ type: DeployDto })
	@UseInterceptors(FileInterceptor("file"))
	async deployFront(
		@Headers("x-deploy-key") deployKey: string,
		@UploadedFile(
			"file",
			new ParseFilePipe({
				validators: [
					new FileTypeValidator({
						fileType:
							/^(application\/x-zip-compressed|application\/zip|application\/octet-stream|multipart\/x-zip|application\/zip-compressed|application\/x-zip)$/,
					}),
				],
			}),
		)
		file: Express.Multer.File,
	) {
		if (deployKey != Env.DEPLOY_KEY) throw new ForbiddenException();
		await this.frontService.deploy(file);
		return new ApiResponseDto(null, null, "Deployed successfully");
	}
}
`;

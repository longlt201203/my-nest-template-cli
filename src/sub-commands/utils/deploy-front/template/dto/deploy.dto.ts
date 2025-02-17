export default `
import { ApiProperty } from "@nestjs/swagger";

export class DeployDto {
	@ApiProperty({ type: "string", format: "binary" })
	file: any;
}
`;

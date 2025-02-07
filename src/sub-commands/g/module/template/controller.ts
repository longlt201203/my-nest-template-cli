export default `
import { Controller, Param, Body, Query, Post, Get, Put, Delete } from "@nestjs/common";
import { <%= moduleCapitalizedName %>Service } from "./<%= moduleName %>.service";
import { Create<%= moduleCapitalizedName %>Request, Update<%= moduleCapitalizedName %>Request, <%= moduleCapitalizedName %>Query } from "./dto";
import { ApiResponseDto } from "@utils";

@Controller("<%= moduleName %>")
export class <%= moduleCapitalizedName %>Controller {
    constructor(
        private readonly <%= moduleCamelcaseName %>Service: <%= moduleCapitalizedName %>Service
    ) {}

    @Post()
    async createOne(@Body() dto: Create<%= moduleCapitalizedName %>Request) {
        await this.<%= moduleCamelcaseName %>Service.createOne(dto);
        return new ApiResponseDto(null, null, "Created successfully");
    }

    @Put(":id")
    async updateOne(@Param("id") id: string, @Body() dto: Update<%= moduleCapitalizedName %>Request) {
        await this.<%= moduleCamelcaseName %>Service.updateOne(id, dto);
        return new ApiResponseDto(null, null, "Updated successfully");
    }

    @Get()
    async findMany(@Query() query: <%= moduleCapitalizedName %>Query) {
        const data = await this.<%= moduleCamelcaseName %>Service.findMany(query);
        return new ApiResponseDto(data);
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        const data = await this.<%= moduleCamelcaseName %>Service.findOne(id);
        return new ApiResponseDto(data);
    }

    @Delete(":id")
    async deleteOne(@Param("id") id: string) {
        await this.<%= moduleCamelcaseName %>Service.deleteOne(id);
        return new ApiResponseDto(null, null, "Deleted successfully");
    }
}
`;

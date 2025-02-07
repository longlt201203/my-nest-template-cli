export default `
import { Injectable } from "@nestjs/common";
import { Create<%= moduleCapitalizedName %>Request, Update<%= moduleCapitalizedName %>Request, <%= moduleCapitalizedName %>Query } from "./dto";

@Injectable()
export class <%= moduleCapitalizedName %>Service {
    async createOne(dto: Create<%= moduleCapitalizedName %>Request) {}

    async updateOne(id: string | number, dto: Update<%= moduleCapitalizedName %>Request) {}

    async findMany(query: <%= moduleCapitalizedName %>Query) {}

    async findOne(id: string | number) {}

    async deleteOne(id: string | number) {}
}
`;

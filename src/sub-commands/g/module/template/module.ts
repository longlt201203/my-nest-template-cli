export default `

import { Module } from "@nestjs/common";
import { <%= moduleCapitalizedName %>Service } from "./<%= moduleName %>.service";
import { <%= moduleCapitalizedName %>Controller } from "./<%= moduleName %>.controller";

@Module({
    providers: [<%= moduleCapitalizedName %>Service],
    exports: [<%= moduleCapitalizedName %>Service],
    controllers: [<%= moduleCapitalizedName %>Controller]
})
export class <%= moduleCapitalizedName %>Module {}

`;

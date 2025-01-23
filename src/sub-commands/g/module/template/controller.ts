export default `

import { Controller } from "@nestjs/common";
import { <%= moduleCapitalizedName %>Service } from "./<%= moduleName %>.service";

@Controller("<%= moduleName %>")
export class <%= moduleCapitalizedName %>Controller {
    constructor(
        private readonly <%= moduleCamelcaseName %>Service: <%= moduleCapitalizedName %>Service
    ) {}
}

`;

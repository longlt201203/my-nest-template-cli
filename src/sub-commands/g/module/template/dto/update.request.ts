export default `
import { Create<%= moduleCapitalizedName %>Request } from "./create.request";

export class Update<%= moduleCapitalizedName %>Request extends Create<%= moduleCapitalizedName %>Request {}
`;

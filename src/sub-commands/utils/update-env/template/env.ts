export default `
import { config } from "dotenv";

config();

export const Env = {

<%- envLines.join(',\\n') %>,

} as const;

console.log(Env);
`;

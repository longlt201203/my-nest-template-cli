import { exec, ExecOptions } from "child_process";

export async function execPromise(command: string, options: ExecOptions) {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

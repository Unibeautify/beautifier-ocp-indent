import {
  Beautifier,
  BeautifierBeautifyData,
  DependencyType,
  ExecutableDependency,
} from "unibeautify";
import * as readPkgUp from "read-pkg-up";
import options from "./options";

const { pkg } = readPkgUp.sync({ cwd: __dirname });
export const beautifier: Beautifier = {
  name: "ocp-indent",
  package: pkg,
  dependencies: [
    {
      type: DependencyType.Executable,
      name: "ocp-indent",
      program: "ocp-indent",
      homepageUrl: "https://github.com/OCamlPro/ocp-indent",
      installationUrl: "https://www.typerex.org/ocp-indent.html",
      bugsUrl: "https://github.com/OCamlPro/ocp-indent/issues",
      badges: []
    },
  ],
  options: {
    OCaml: {},
  },
  beautify({
    text,
    options,
    filePath,
    projectPath,
    dependencies,
    beautifierConfig,
  }: BeautifierBeautifyData) {
    const executable = dependencies.get<ExecutableDependency>("ocp-indent");
    return executable
      .run({ args: [], stdin: text, options: {} })
      .then(({ exitCode, stderr, stdout }) => {
        if (exitCode) {
          return Promise.reject(stderr);
        }
        return Promise.resolve(stdout);
      });
  },
};
export default beautifier;

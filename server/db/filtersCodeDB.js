import { CodeModel } from "./codesDB.js";

export async function getCodeDB() {
  return new Promise((resolve, reject) => {
    CodeModel.find((err, data) => {
      if (err) {
        resolve("error");
      } else {
        resolve(data);
      }
    });
  });
}

export async function validateCode(code) {
  const codeData = await getCodeDB();

  const codeFound = codeData.find((element) => element.code === code);
  if (codeFound) return codeFound;
}

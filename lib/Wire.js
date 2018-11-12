const fs = require('fs');
const path = require('path');
const flatten = require('lodash/flattenDeep');

class Wire {
  constructor() {
    console.log('Wire initialized!');
  }

  /**
   * @private
   * @description Generates the file
   * @param {{name: string, path: string}[]} set The set to be processed
   * @param {string} filename Filename of the generated file
   */
  _createFile(set, filename) {
    const setToProcess = flatten(set);
    let dataToSave = '';
    setToProcess.forEach(s => {
      dataToSave += this._generateReq(s);
    });
    dataToSave += `\nmodule.exports = () => {
${this._genTryCatch(setToProcess)}
};`;
    fs.writeFile(filename, dataToSave, err => {
      if (err) return console.log(err);
    });
    console.log(`File saved to ${path.resolve(filename)}`);
  }

  /**
   * @private
   * @description Generates the `const {<name>} = require('<path>') block
   * @param {{name: string, path: string}} lib Current Provider
   */
  _generateReq(lib) {
    return `const { ${lib.name} } = require('${lib.path}');\n`;
  }

  /**
   * @private
   * @description Creates the Try-Catch (with variables) for the given set
   * @param {Object[]} set The set from which the Try-Catch block will be generated
   */
  _genTryCatch(set) {
    let block = '  try {\n';
    let varName = ``;
    set.forEach((s, index) => {
      varName = `var${`_${index}`}`;
      const prevVarName = `${index >= 1 ? `var_${index - 1}` : ''}`;
      block += `    const ${varName} = ${s.name}(${prevVarName});\n`;
    });
    block += `    return ${varName};\n`;
    block += '  } catch (e) { console.log(e); return e; } ';
    return block;
  }

  /**
   * @description Builds the set
   * @param {Object[]} set The set to be created
   * @param {string} set[].name Name of the provider to be imported
   * @param {string} set[].path Relative path to the file containing provider
   * @param {string} [filename='wire_gen.js'] Name of the file where the output will be saved
   */
  build(set, filename = 'wire_gen.js') {
    console.log('Began building process...');
    this._createFile(set, filename);
  }

  /**
   * @description Creates new set
   * @param {Object[]} set The set to be created
   * @param {string} set[].name Name of the provider to be imported
   * @param {string} set[].path Relative path to the file containing provider
   * @returns {Array} The same set that was paseed, can be passed to build method
   */
  newSet(set) {
    console.log('Set created...');
    return set;
  }
}

module.exports = Wire;

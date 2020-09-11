const path = require('path'); // construire et manipuler des chemins
// vers les fichiers et répertoires
const fs = require('fs'); // sytème de fichier : innteragir avec les fichiers et
// répertoires présents sur l'ordi
const solc = require('solc');



const LotteryPath = path.resolve(__dirname, 'Contracts', 'Lottery.sol');
// calculer le chemin absolu
const source = fs.readFileSync(LotteryPath, 'UTF-8'); // UTF-8 encodage

const compiledCode = solc.compile(source, 1); // 1 pour préciser le nombre de contrat
console.log(compiledCode);

module.exports = compiledCode.contracts[':Lottery'];

'use strict'
const bcrypt = require('bcrypt');
const helpers = {};

helpers.SECRET_KEY = "FitData";

//Codificar contraseña
helpers.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10),null);
}

//Decodificar contraseña
helpers.matchPassword = (userPassword, password) => {
    return bcrypt.compareSync(userPassword,password);
}

helpers.getImagePath = (multimedia) => {
    let filePath = multimedia.path;
    let fileSplit = (process.platform != 'linux') ? filePath.split('\\') : filePath.split('\/');
    let fileName = fileSplit[fileSplit.length - 1];
    let extSplit = fileName.split('\.');
    var fileExt = extSplit[1];
    if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpge' || fileExt == 'JPG') {
        return fileName;
    } else {
        //Elimina el archivo subido en caso de ser inválido
        fs.unlink(filePath, (err) => {
            console.log(err);
            return 'La extensión no es válida';
        });
    }
}

module.exports = helpers;

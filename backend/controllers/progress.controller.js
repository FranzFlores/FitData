'use strict'

const fs = require('fs');
const path = require('path');

const Progress = require('../models/progress.model');
var ProgressController = {};

ProgressController.createProgress = (req, res) => {
    new Progress({
        idUser: req.params.idUser,
        weight: req.body.weight,
        measurementDate: req.body.measurementDate,
        image: []
    }).save()
        .then(newProgress => {
            if (!newProgress) {
                res.status(404).send({ msg: 'No se pudo crear el registro de progreso' });
            } else {
                res.status(200).json({ newProgress });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al crear el progreso' });
        });
};

ProgressController.getProgressRegisters = (req, res) => {
    Progress.find({ idUser: req.params.idUser })
        .then(progress => {
            res.status(200).send(progress);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al consultar el progreso' });
        });
};

ProgressController.getProgressRegister = (req, res) => {
    Progress.findById(req.params.id)
        .then(progress => {
            if (!progress) {
                res.status(404).send({ msg: 'No se pudo consultar el progreso' });
            } else {
                res.status(200).send(progress);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al consultar el progreso' });
        });
};

ProgressController.updateProgressRegister = (req, res) => {

    let progressUpdate = {
        weight: req.body.weight,
        measurementDate: req.body.measurementDate,
    }

    Progress.findOneAndUpdate({ _id: req.params.id }, progressUpdate)
        .then(result => {
            if (!result) {
                res.status(404).send({ msg: 'No se pudo actualizar el progreso' });
            } else {
                res.status(200).send(result);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al actualizar el progreso' });
        });
};

ProgressController.uploadImages = (req, res) => {
    let imagesUpload = [];

    if (req.files.image && req.files.image.length >= 1) {
        for (let i = 0; i < req.files.image.length; i++) {
            let filePath = req.files.image[i].path;
            let fileSplit = filePath.split('\/');
            let fileName = fileSplit[fileSplit.length - 1];
            let extSplit = fileName.split('\.');
            var fileExt = extSplit[1];
            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpge' || fileExt == 'JPG') {
                let image = {
                    fileName: fileName
                }
                imagesUpload.push(image);
            } else {
                //Elimina el archivo subido en caso de ser inválido
                fs.unlink(filePath, (err) => {
                    console.log(err);
                    return res.status(200).send({ msg: 'La extensión no es válida' });
                });
            }
        }

        Progress.updateOne({ _id: req.params.id }, { images: imagesUpload })
            .then(progressUpdate => {
                if (!progressUpdate) {
                    res.status(404).send({ msg: 'No se ha podido subir la(s) imagen' });
                } else {
                    res.status(200).json(progressUpdate);
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({ msg: 'Error al subir imagen' });
            });
    }
}

ProgressController.getImagesProgress = (req,res) => {
    var path_file = './backend/uploads/progress/' + req.params.imageFile;
    fs.stat(path_file, (error) => {
        if (!error) {
            return res.sendFile(path.resolve(path_file));
        } else {
            return res.status(204).send({
                msg: 'No existe la imagen'
            })
        }
    });
}

module.exports = ProgressController;

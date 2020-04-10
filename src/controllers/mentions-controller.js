const { validationResult } = require('express-validator');
const repository = require('../repositories/mentions-repository');

module.exports = {
    async listMentions(req, res) {
        try {
            const data = await repository.listMentions();
            res.status(200).send(data);
        } catch (e) {
            res.status(500).send({ message: 'Falha ao carregar as menções.' });
        }
    },

    async createMention(req, res) {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                return res.status(400).send({ message: errors })
            }
            await repository.createMention({
                friend: req.body.friend,
                mention: req.body.mention
            });

            res.status(201).send({ message: 'Menção cadastrada com sucesso!' });
        } catch (e) {
            res.status(500).send({ message: 'Falha ao cadastrar a menção.' });
        }
    },

    async updateMention(req, res) {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                return res.status(400).send({ message: errors })
            }
            await repository.updateMention(req.params.id, req.body);
            res.status(200).send({
                message: 'Menção atualizada com sucesso!'
            });
        } catch (e) {
            res.status(500).send({ message: 'Falha ao atualizar a menção.' });
        }
    },

    async deleteMention(req, res) {
        try {
            await repository.deleteMention(req.params.id);
            res.status(200).send({
                message: 'Menção removida com sucesso!'
            });
        } catch (e) {
            res.status(500).send({ message: 'Falha ao remover a menção.' });
        }
    },
}

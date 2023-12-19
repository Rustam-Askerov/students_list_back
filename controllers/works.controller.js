const db = require('../db')
const errorsController = require('../utils/work_errors_handling')

class WorksController {
    async getWorks(req, res) {
        try {
            const works = await db.query('SELECT * FROM works')
            if (works.rowCount == 0) {
                throw new GeneralError('Записей о работах нет.')
            }
            res.json(works.rows)
        } catch (error) {
            errorsController.createWorksErrorsHandling(error, res)
        }
    }

    async getWorkByID(req, res) {
        const id = req.params.id
        try {
            //Проверка на существование записи
            const is_exist = await db.query(' SELECT (SELECT COUNT(id) FROM works WHERE id = $1) > 0 as exist', [id])
            if (!is_exist.rows[0].exist) {
                throw new GeneralError('Запись о работе не найдена.')
            }
            const work = await db.query('SELECT * FROM works WHERE id=$1', [id])
            res.json(work.rows[0])
        } catch (error) {
            errorsController.getWorkByIDErrorsHandling(error, res, id)
        }
    }

    async updateWork(req, res) {
        const { id, name, fk_student_id, work_type, assesment, work_due_date } = req.body
        try {
            //Проверка на существование записи
            const is_exist = await db.query(' SELECT (SELECT COUNT(id) FROM works WHERE id = $1) > 0 as exist', [id])
            if (!is_exist.rows[0].exist) {
                throw new GeneralError('Запись о работе не найдена.')
            }
            const work = await db.query('UPDATE works set work_name = $2, fk_student_id=$3, work_type=$4, assesment=$5, work_due_date=$6 WHERE id = $1 RETURNING *', [id, name, fk_student_id, work_type, assesment, work_due_date])
            res.json(work.rows[0])
        } catch (error) {
            errorsController.updateWorkErrorsHandling(error, res, id)
        }
    }

    async deleteWork(req, res) {
        const id = req.params.id
        try {
            //Проверка на существование записи
            const is_exist = await db.query(' SELECT (SELECT COUNT(id) FROM works WHERE id = $1) > 0 as exist', [id])
            if (!is_exist.rows[0].exist) {
                throw new GeneralError('Запись о работе не найдена.')
            }
            const work = await db.query('DELETE FROM works WHERE id=$1', [id])
            res.json({
                delete: "success"
            })
        } catch (error) {
            errorsController.deleteWorkErrorsHandling(error, res, id)
        }
    }

    async createWork(req, res) {
        const { name, fk_student_id, work_type, assesment, work_due_date } = req.body
        try {
            const newWork = await db.query('INSERT INTO works (work_name, fk_student_id, work_type, assesment, work_due_date) values ($1,$2,$3,$4,$5) RETURNING *', [name, fk_student_id, work_type, assesment, work_due_date])
            res.json(newWork.rows[0])
        } catch (error) {
            errorsController.createWorksErrorsHandling(error, res)
        }
    }
}

class GeneralError extends Error {
    constructor(code) {
        super();
        this.code = code;
    }
}

module.exports = new WorksController()

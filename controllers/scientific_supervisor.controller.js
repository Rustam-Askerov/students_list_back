const db = require('../db')
const errorsController = require('../utils/supervisor_error_handling')

class ScientificSupervisorController {

    async createSupervisor(req, res) {
        const { full_name, post, academic_degree, fk_department_id } = req.body
        try {
            const newSupervisor = await db.query(' INSERT INTO supervisor(full_name, post, academic_degree, fk_department_id) values ($1, $2, $3, $4) RETURNING *', [full_name, post, academic_degree, fk_department_id])
            res.json(newSupervisor.rows[0])
        } catch (error) {
            errorsController.createSupervisorErrorsHandling(error,res,fk_department_id)
        }
    }

    async getSupervisors(req, res) {
        try {
            const supervisors = await db.query('SELECT * FROM supervisor');
            if(supervisors.rowCount==0){
                throw new GeneralError('Записей о научных руководителях нет.')
            }
            res.json(supervisors.rows)
        } catch (error) {
            errorsController.getSupervisorsErrorsHandling(error,res)
        }
    }

    async getSupervisorsByID(req, res) {
        const id = req.params.id
        try {
            //Проверка на существование записи
            const is_exist = await db.query(' SELECT (SELECT COUNT(id) FROM supervisor WHERE id = $1) > 0 as exist', [id])
            if (!is_exist.rows[0].exist) {
                throw new GeneralError('Научный руководитель не найден.')
            }
            const supervisors = await db.query('SELECT * FROM supervisor WHERE id=$1', [id]);
            res.json(supervisors.rows[0])
        } catch(error) {
            errorsController.getSupervisorByIDErrorsHandling(error,res,id)
        }
    }

    async updateSupervisor(req, res) {
        const { id, full_name, post, academic_degree, fk_department_id } = req.body
        try {
            //Проверка на существование записи
            const is_exist = await db.query(' SELECT (SELECT COUNT(id) FROM supervisor WHERE id = $1) > 0 as exist', [id])
            if (!is_exist.rows[0].exist) {
                throw new GeneralError('Научный руководитель не найден.')
            }
            const supervisor = await db.query(' UPDATE supervisor set full_name=$2, post = $3, academic_degree= $4, fk_department_id = $5 WHERE id = $1 RETURNING *', [id, full_name, post, academic_degree, fk_department_id])
            res.json(supervisor.rows[0])
        } catch (error) {
            errorsController.updateSupervisorErrorsHandling(error,res,id,fk_department_id)
        }
    }

    async deleteSupervisor(req, res) {
        const id = req.params.id
        try {
            const is_exist = await db.query(' SELECT (SELECT COUNT(id) FROM supervisor WHERE id = $1) > 0 as exist', [id])
            if (!is_exist.rows[0].exist) {
                throw new GeneralError('Научный руководитель не найден.')
            }
            const supervisor = await db.query('DELETE FROM supervisor WHERE id=$1', [id])
            res.json({
                delete:"success"
            })
        }
        catch (error) {
            errorsController.deleteSupervisorByIDErrorsHandling(error,res,id)
        }
    }
}


class GeneralError extends Error {
    constructor(code) {
        super();
        this.code = code;
    }
}

module.exports = new ScientificSupervisorController()
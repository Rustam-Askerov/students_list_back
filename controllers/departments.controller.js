const db = require('../db')

class DepartmentsController {
    async getDepartments(req, res) {
        try {
            const departments = await db.query('SELECT * FROM department');
            if(departments.rowCount==0){
                throw new GeneralError('Записей о кафедрах.')
            }
            res.json(departments.rows)
        } catch (error) {
            res.status(500).json({
                error:error.code
            })
        }
    }

    async getDepartmentByID(req, res) {
        const id = req.params.id
        try {
            //Проверка на существование записи
            const is_exist = await db.query(' SELECT (SELECT COUNT(id) FROM department WHERE id = $1) > 0 as exist', [id])
            if (!is_exist.rows[0].exist) {
                throw new GeneralError(`Кафедра с идентификатором ${id} не найдена.`)
            }
            const departments = await db.query('SELECT * FROM department WHERE id=$1', [id]);
            res.json(departments.rows[0])
        } catch(error) {
            res.status(500).json({
                error:error.code
            })
        }
    }
}

class GeneralError extends Error {
    constructor(code) {
        super();
        this.code = code;
    }
}

module.exports = new DepartmentsController()
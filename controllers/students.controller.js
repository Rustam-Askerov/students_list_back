const db = require('../db')
const errorsController = require('../utils/student_errors_handling')

class StudentsController {
    async createStudent(req, res) {
        const { full_name, group_name, student_id_number, fk_department_id, fk_scientific_supervisor_id, stage, date_of_admission, date_of_graduate, is_graduate } = req.body
        try {
            const newStudentRow = await db.query('INSERT INTO student(full_name, group_name, student_id_number,fk_department_id,fk_scientific_supervisor_id,stage,date_of_admission,date_of_graduate,is_graduate) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [full_name, group_name, student_id_number, fk_department_id, fk_scientific_supervisor_id, stage, date_of_admission, date_of_graduate, is_graduate])
            res.json(newStudentRow.rows[0])
        } catch (error) {
            errorsController.createStudentErrorsHandling(error, res, student_id_number, fk_department_id)
        }
    }

    async getStudent(req, res) {
        try {
            const students = await db.query('SELECT * FROM student')
            if (students.rowCount == 0) {
                throw new GeneralError('Записей о студентах нет.')
            }
            res.json(students.rows)
        }
        catch (error) {
            errorsController.getStudentsErrorsHandling(error, res)
        }
    }

    async getStudentByID(req, res) {
        const id = req.params.id
        try {
            //Проверка на существование записи
            const is_exist = await db.query(' SELECT (SELECT COUNT(id) FROM student WHERE id = $1) > 0 as exist', [id])
            if (!is_exist.rows[0].exist) {
                throw new GeneralError('Студент не найден.')
            }
            const student = await db.query('SELECT * FROM student WHERE id = $1', [id])
            res.json(student.rows[0])
        } catch (error) {
            errorsController.getStudentByIDErrorsHandling(error,res,id)
        }
    }

    async updateStudent(req, res) {
        const { id, full_name, group_name, student_id_number, fk_department_id, fk_scientific_supervisor_id, stage, date_of_admission, date_of_graduate, is_graduate } = req.body
        try {
            //Проверка на существование записи
            const is_exist = await db.query(' SELECT (SELECT COUNT(id) FROM student WHERE id = $1) > 0 as exist', [id])
            if (!is_exist.rows[0].exist) {
                throw new GeneralError('Студент не найден.')
            }
            //проверка на заархивированность
            const student_by_id = await db.query('SELECT * FROM student WHERE id=$1', [id])
            if (student_by_id.rows[0].is_graduate) {
                throw new GeneralError('Запись заархивирована.')
            }
            const student = await db.query('UPDATE student set full_name = $2, group_name = $3, student_id_number = $4,fk_department_id = $5,fk_scientific_supervisor_id = $6,stage=$7,date_of_admission = $8 ,date_of_graduate =  $9,is_graduate =$10 WHERE id = $1 RETURNING *', [id, full_name, group_name, student_id_number, fk_department_id, fk_scientific_supervisor_id, stage, date_of_admission, date_of_graduate, is_graduate])
            res.json(student.rows[0])
        }
        catch (error) {
            errorsController.updateStudentErrorsHandling(error, res, id, student_id_number, fk_department_id, is_graduate)
        }
    }

    async deleteStudent(req, res) {
        const id = req.params.id
        try {
            const is_exist = await db.query(' SELECT (SELECT COUNT(id) FROM student WHERE id = $1) > 0 as exist', [id])
            if (!is_exist.rows[0].exist) {
                throw new GeneralError('Студент не найден.')
            }
            const student = await db.query('DELETE FROM student WHERE id=$1', [id])
            res.json({
                delete: "success"
            })
        }
        catch (error) {
            errorsController.updateStudentErrorsHandling(error, res, id)
        }
    }

}

class GeneralError extends Error {
    constructor(code) {
        super();
        this.code = code;
    }
}


module.exports = new StudentsController()

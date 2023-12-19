class StudentErrorsHandling {

    createStudentErrorsHandling(error, res, student_id_number, fk_department_id) {
        const fieldsName = ['full_name', 'group_name', 'student_id_number', 'department_id', 'scientific_supervisor_id', 'stage', 'date_of_admission', 'date_of_graduate', 'is_graduate']
        switch (error.code) {
            case '22P02':
                return res.status(400).json({
                    status: '400',
                    error_type: 'ValidationException',
                    error_code: error.code,
                    field: fieldsName[Number(error.where.toString().substring(32, 33)) - 1],
                    message: 'Некорректный тип входных параметров запроса.',
                },
                );
            case '22007': {
                return res.status(400).json({
                    status: '400',
                    error_type: 'ValidationException',
                    error_code: error.code,
                    field: fieldsName[Number(error.where.toString().substring(32, 33)) - 1],
                    message: 'Некорректный тип входных параметров запроса.',
                },
                );
            }
            case '23505':
                return res.status(400).json({
                    status: '400',
                    error_type: 'DataException',
                    error_code: error.code,
                    message: `Студент с номером студенческого билета ${student_id_number} уже существует.`,
                },);
            case '23503':
                return res.status(404).json({
                    status: '404',
                    error_type: 'EntityNotFoundException',
                    error_code: error.code,
                    message: `Кафедра с идентификатором ${fk_department_id} не найдена.`,
                },);
            case 'ECONNREFUSED':
                res.status(500).json({
                    status: '500',
                    error_type: 'DatabaseException',
                    error_code: error.code,
                    message: error,
                },);
            default:
                res.status(500).json({
                    status: '500',
                    code: error.code,
                    error_type: 'Server error',
                    message: error,
                },);
        }
    }

    updateStudentErrorsHandling(error, res, id, student_id_number, fk_scientific_supervisor_id, is_graduate) {
        const fieldsName = ['id', 'full_name', 'group_name', 'student_id_number', 'department_id', 'scientific_supervisor_id', 'stage', 'date_of_admission', 'date_of_graduate', 'is_graduate']

        switch (error.code) {
            case 'Студент не найден.':
                return res.status(404).json({
                    status: '404',
                    error_code: error.code,
                    error_type: 'EntityNotFoundException',
                    message: `Студент с идентификатором ${id} не найден.`,
                },);
            case 'Запись заархивирована.':
                return res.status(400).json({
                    status: '400',
                    error_code: error.code,
                    error_type: 'DataException',
                    message: `Запись о студенте с идентификатором ${id} заархивированна.`,
                },);
            case '22P02':
                return res.status(400).json({
                    status: '400',
                    error_type: 'ValidationException',
                    error_code: error.code,
                    field: fieldsName[Number(error.where.toString().substring(32, 33)) - 1],
                    message: 'Некорректный тип входных параметров запроса.',
                },
                );
            case '22007': {
                return res.status(400).json({
                    status: '400',
                    error_type: 'ValidationException',
                    error_code: error.code,
                    field: fieldsName[Number(error.where.toString().substring(32, 33)) - 1],
                    message: 'Некорректный тип входных параметров запроса.',
                },
                );
            }
            case '23505':
                return res.status(400).json({
                    status: '400',
                    error_type: 'DataException',
                    error_code: error.code,
                    message: `Студент с номером студенческого билета ${student_id_number} уже существует.`,
                },);
            case '23503':
                return res.status(404).json({
                    status: '404',
                    error_type: 'EntityNotFoundException',
                    error_code: error.code,
                    message: `Кафедра с идентификатором ${fk_department_id} не найдена.`,
                },);
            case 'ECONNREFUSED':
                res.status(500).json({
                    status: '500',
                    error_type: 'DatabaseException',
                    error_code: error.code,
                    message: error,
                },);
            default:
                return res.status(500).json({
                    status: '500',
                    error_type: 'DatabaseException',
                    error_code: error.code,
                    message: error,
                },);

        }
    }

    deleteStudentByIdErrorsHandling(error, res, id) {
        switch (error.code) {
            case 'Студент не найден.':
                return res.status(404).json({
                    status: '404',
                    error_code: error.code,
                    error_type: 'EntityNotFoundException',
                    message: `Студент с идентификатором ${id} не найден`,
                },);
            case 'ECONNREFUSED':
                res.status(500).json({
                    status: '500',
                    error_type: 'DatabaseException',
                    error_code: error.code,
                    message: error,
                },);
            default:
                return res.status(500).json({
                    status: '500',
                    error_type: 'DatabaseException',
                    error_code: error.code,
                    message: error,
                },);
        }
    }

    getStudentsErrorsHandling(error,res){
        switch (error.code) {
            case 'Записей о студентах нет.':
                return res.status(404).json({
                    status: '404',
                    error_code: error.code,
                    error_type: 'EntityNotFoundException',
                    message: `В базе данных отстутсвуют записи о студентах.`,
                },);
            case 'ECONNREFUSED':
                res.status(500).json({
                    status: '500',
                    error_type: 'DatabaseException',
                    error_code: error.code,
                    message: error,
                },);
            default:
                return res.status(500).json({
                    status: '500',
                    error_type: 'DatabaseException',
                    error_code: error.code,
                    message: error,
                },);
        }
    }

    getStudentByIDErrorsHandling(error,res,id){
        switch (error.code) {
            case 'Студент не найден.':
                return res.status(404).json({
                    status: '404',
                    error_code: error.code,
                    error_type: 'EntityNotFoundException',
                    message: `Студент с идентификатором ${id} не найден.`,
                },);
            case 'ECONNREFUSED':
                res.status(500).json({
                    status: '500',
                    error_type: 'DatabaseException',
                    error_code: error.code,
                    message: error,
                },);
            default:
                return res.status(500).json({
                    status: '500',
                    error_type: 'DatabaseException',
                    error_code: error.code,
                    message: error,
                },);
        }
    }
}

module.exports = new StudentErrorsHandling()
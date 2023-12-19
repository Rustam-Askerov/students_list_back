class WorkErrorsHandling {
    getWorksErrorsHandling(error, res) {
        switch (error.code) {
            case 'Записей о работах нет.':
                return res.status(404).json({
                    status: '404',
                    error_code: error.code,
                    error_type: 'EntityNotFoundException',
                    message: `В базе данных отстутсвуют записи о научных работах.`,
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

    getWorkByIDErrorsHandling(error, res,id) {
        switch (error.code) {
            case 'Запись о работе не найдена.':
                return res.status(404).json({
                    status: '404',
                    error_code: error.code,
                    error_type: 'EntityNotFoundException',
                    message: `Запись о работе с идентификатором ${id} не найдена.`,
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

    createWorksErrorsHandling(error, res) {
        const fieldsName = ['work_name', 'fk_student_id', 'type_works', 'assesment', 'work_due_date']
        switch (error.code) {
            case 'Записей о работах нет.':
                return res.status(404).json({
                    status: '404',
                    error_code: error.code,
                    error_type: 'EntityNotFoundException',
                    message: 'В базе данных отстутсвуют записи о научных работах.',
                },);
            case '22007':
                return res.status(400).json({
                    status: '400',
                    error_type: 'ValidationException',
                    error_code: error.code,
                    field: fieldsName[Number(error.where.toString().substring(32, 33)) - 1],
                    message: 'Некорректный тип входных параметров запроса.',
                },
                );
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

    updateWorkErrorsHandling(error, res, id) {
        const fieldsName = ['id', 'work_name', 'fk_student_id', 'type_works', 'assesment', 'work_due_date']
        switch (error.code) {
            case 'Запись о работе не найдена.':
                return res.status(404).json({
                    status: '404',
                    error_code: error.code,
                    error_type: 'EntityNotFoundException',
                    message: `Запись о работе с идентификатором ${id} не найдена.`,
                },);
            case '22007':
                return res.status(400).json({
                    status: '400',
                    error_type: 'ValidationException',
                    error_code: error.code,
                    field: fieldsName[Number(error.where.toString().substring(32, 33))],
                    message: 'Некорректный тип входных параметров запроса.',
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

    deleteWorkErrorsHandling(error, res, id) {
        switch (error.code) {
            case 'Запись о работе не найдена.':
                return res.status(404).json({
                    status: '404',
                    error_code: error.code,
                    error_type: 'EntityNotFoundException',
                    message: `Запись о работе с идентификатором ${id} не найдена.`,
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
}

module.exports = new WorkErrorsHandling()
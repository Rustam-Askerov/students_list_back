class SupervisorErrorsHandling{

    createSupervisorErrorsHandling(error,res,fk_department_id){
        const fieldsName = ['full_name', 'post', 'academic_degree', 'fk_department_id']
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

    updateSupervisorErrorsHandling(error,res,id,fk_department_id){
        const fieldsName = ['id','full_name', 'post', 'academic_degree', 'fk_department_id']
        switch (error.code) {
            case 'Научный руководитель не найден.':
                return res.status(404).json({
                    status: '404',
                    error_code: error.code,
                    error_type: 'EntityNotFoundException',
                    message: `Научный руководитель с идентификатором ${id} не найден.`,
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

    deleteSupervisorByIDErrorsHandling(error,res,id){
        switch (error.code) {
            case 'Научный руководитель не найден.':
                return res.status(404).json({
                    status: '404',
                    error_code: error.code,
                    error_type: 'EntityNotFoundException',
                    message: `Научный руководитель с идентификатором ${id} не найден`,
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

    getSupervisorsErrorsHandling(error,res){
        switch (error.code) {
            case 'Записей о научных руководителях нет.':
                return res.status(404).json({
                    status: '404',
                    error_code: error.code,
                    error_type: 'EntityNotFoundException',
                    message: `В базе данных отстутсвуют записи о научных руководителях.`,
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

    getSupervisorByIDErrorsHandling(error,res,id){
        switch (error.code) {
            case 'Научный руководитель не найден.':
                return res.status(404).json({
                    status: '404',
                    error_code: error.code,
                    error_type: 'EntityNotFoundException',
                    message: `Научный руководитель с идентификатором ${id} не найден.`,
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

module.exports = new SupervisorErrorsHandling()
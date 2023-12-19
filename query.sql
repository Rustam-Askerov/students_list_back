create Table student (
    id serial primary key,
    full_name varchar(255),
    group_name varchar(255),
    student_id_number integer unique,
    fk_department_id integer null,
    fk_scientific_supervisor_id int null, 
    stage varchar(255),
    date_of_admission date,
    date_of_graduate date null,
    is_graduate boolean null,
    FOREIGN KEY(fk_department_id) REFERENCES department(id) ON DELETE SET NULL (fk_department_id),
    FOREIGN KEY(fk_scientific_supervisor_id) 
        REFERENCES supervisor(id) ON DELETE SET NULL (fk_scientific_supervisor_id)
);

create Table department(
    id serial primary key,
    department_name varchar(255),
    faculty varchar(255)
);

create Table supervisor(
    id serial primary key,
    full_name varchar(255),
    post varchar(255),
    academic_degree varchar(255) null,
    fk_department_id int,
    FOREIGN KEY(fk_department_id ) REFERENCES department(id)
);

create Table works (
    id serial primary key,
    work_name varchar(255),
    fk_student_id int,
    work_type varchar(255),
    assesment varchar(255) null,
    work_due_date date null,
    FOREIGN KEY(fk_student_id) 
        REFERENCES student(id) ON DELETE CASCADE
);

insert into department (department_name,faculty) values 
('Математического моделирование', 'Математический'),
('Дифференциальных уравнений', 'Математический'),
('Математического анализа', 'Математический'),
('Алгебры и математической логики', 'Математический'),
('Компьютерной безопасности и математических методов обработки информации', 'Математический'),
('Нелинейной динамики', 'Математический'),
('Кафедра дискретного анализа','ИВТ'),
('Кафедра компьютерных сетей', 'ИВТ'),
('Кафедра теоретической информатики','ИВТ'),
('Кафедра вычислительных и программных систем','ИВТ'),
('Кафедра информационных и сетевых технологий','ИВТ');

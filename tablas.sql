CREATE TABLE IF NOT EXISTS Libros(
    id_libro int AUTO_INCREMENT,
    nombre varchar(28) null,
    genero varchar(28) null,
    fecha_lanzamiento date null,
    autor varchar(28) null,
    PRIMARY KEY(id_libro)
);

CREATE TABLE IF NOT EXISTS Alumnos(
    id_alumno int AUTO_INCREMENT,
    numero_cuenta varchar(28) null,
    nombre varchar(28) null,
    apellido varchar(28) null,
    PRIMARY KEY(id_alumno)
);

CREATE TABLE IF NOT EXISTS Prestamos(
    id_prestamo int AUTO_INCREMENT,
    id_libro int null,
    numero_cuenta varchar(28) null,
    fecha_prestamo date null,
    PRIMARY KEY(id_prestamo),
    FOREIGN KEY(id_libro) REFERENCES Libros(id_libro)
);

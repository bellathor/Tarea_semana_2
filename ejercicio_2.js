const http = require('http');
const url = require('url');
const mysql = require('mysql');

http.createServer((req, res) => {
    let conexion = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ejercicio2_dappwb1'

    });

    res.writeHead(200, { 'Content-Type': 'text/json' });
    var q = url.parse(req.url, true);
    var params = q.query;


    conexion.connect((err) => {
        if (err) throw err;
        console.log('conexion establecida con la biblioteca');
        var values = [];
        var sql = "";
        switch (params.opcion) {
            case 'insert':
                if(params.tabla === 'libros'){
                    values = [params.nombre, params.genero, params.fecha_lanzamiento, params.autor];
                    sql = 'insert into libros (nombre, genero, fecha_lanzamiento, autor) values (?)';
                    conexion.query(sql, [values], (error, result)=>{
                        if(error)throw error;
                        res.write('Registro completado, numero de filas afectadas: ' + result.affectedRows);
                        res.end();
                    });
                }else if(params.tabla === 'alumnos'){
                    values = [params.numero_cuenta, params.nombre, params.apellido];
                    sql = 'insert into alumnos (numero_cuenta, nombre, apellido) values (?)';
                    conexion.query(sql, [values], (error, result)=>{
                        if(error)throw error;
                        res.write('Registro completado, numero de filas afectadas: ' + result.affectedRows);
                        res.end();
                    });

                }else if(params.tabla == 'prestamos'){
                    values = [params.id_libro, params.numero_cuenta, params.fecha_prestamo];
                    sql = 'insert into prestamos (id_libro, numero_cuenta, fecha_prestamo) values (?)';
                    conexion.query(sql, [values], (error, result)=>{
                        if(error)throw error;
                        res.write('Registro completado, numero de filas afectadas: ' + result.affectedRows);
                        res.end();
                    });

                }
                break;
            case 'select':
                if(params.tabla === 'libros'){
                    sql = 'select * from libros'; 
                    conexion.query(sql, (error, result)=>{
                        if(error)throw error;
                        res.write(JSON.stringify(result));
                        res.end()
                    });                   
                }else if(params.tabla === 'alumnos'){
                    sql = 'select * from alumnos'; 
                    conexion.query(sql, (error, result)=>{
                        if(error)throw error;
                        res.write(JSON.stringify(result));
                        res.end()
                    }); 
                }else if(params.tabla == 'prestamos'){
                    sql = 'select * from prestamos'; 
                    conexion.query(sql, (error, result)=>{
                        if(error)throw error;
                        res.write(JSON.stringify(result));
                        res.end()
                    }); 
                }
                break;
            case 'update':
                if(params.tabla === 'libros'){
                    values = [params.nombre, params.genero, params.fecha_lanzamiento, params.autor, params.id];
                    sql = 'update libros set nombre = ?, genero = ?, fecha_lanzamiento = ?, autor = ? where id_libro = ?';
                    conexion.query(sql, values, (error, result)=>{
                        if(error)throw error;
                        res.write('Se actualizaron datos del id: ' + params.id + ' , numero de filas afectadas: ' + result.affectedRows);
                        res.end();
                    })
                }else if(params.tabla === 'alumnos'){
                    values = [params.numero_cuenta, params.nombre, params.apellido, params.id];
                    sql = 'update alumnos set numero_cuenta = ?, nombre = ?, apellido = ? where id_alumno = ?';
                    conexion.query(sql, values, (error, result)=>{
                        if(error)throw error;
                        res.write('Se actualizaron datos del id: ' + params.id + ' , numero de filas afectadas: ' + result.affectedRows);
                        res.end();
                    })

                }else if(params.tabla == 'prestamos'){
                    values = [params.id_libro, params.numero_cuenta, params.fecha_prestamo, params.id];
                    sql = 'update prestamos set id_libro = ?, numero_cuenta = ?, fecha_prestamo = ? where id_prestamo = ?';
                    conexion.query(sql, values, (error, result)=>{
                        if(error)throw error;
                        res.write('Se actualizaron datos del id: ' + params.id + ' , numero de filas afectadas: ' + result.affectedRows);
                        res.end();
                    })
                    
                }
                break;
            case 'delete':
                if(params.tabla === 'libros'){
                    sql = 'delete from libros where id_libro = ?';
                    conexion.query(sql, params.id, (error, result) => {
                        if (error) throw error;
                        res.write('Se elimino el id: ' + params.id, + ' numero de filas afectadas: ' + result.affectedRows);
                        res.end();
                    })
                }else if(params.tabla === 'alumnos'){
                    sql = 'delete from alumnos where id_alumno = ?';
                    conexion.query(sql, params.id, (error, result) => {
                        if (error) throw error;
                        res.write('Se elimino el id: ' + params.id + ' numero de filas afectadas: ' + result.affectedRows);
                        res.end();
                    })
                }else if(params.tabla == 'prestamos'){
                    sql = 'delete from prestamos where id_prestamo = ?';
                    conexion.query(sql, params.id, (error, result) => {
                        if (error) throw error;
                        res.write('Se elimino el id: ' + params.id + ' numero de filas afectadas: ' + result.affectedRows);
                        res.end();
                    })
                }
                break;
        }
    })
}).listen(3030);
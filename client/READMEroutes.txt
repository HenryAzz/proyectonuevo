CRUD Broker
    Ruta get: (http://localhost:3001/broker)
        Devuelve un arreglo con todos los brokers registrados en la base de datos.

    Ruta get: (http://localhost:3001/broker/:id)
        Devuelve un solo objeto broker que corresponda con el ID suministrado por params.

    Ruta post: (http://localhost:3001/broker)
        Crea un nuevo Broker o Admin en la BD. Se le deben suminsitrar los siguientes parametros por body:
            id: Tipo INTEGER (DNI o cedula de identidad) obligatorio y unico
            rol: solo acepta dos valores: 'Broker' o 'Admin'. Obligatorio
            email: Tipo string. (Validar que si sea un email Valido). Obligatorio y unico
            password: Tipo string. Obligatorio
            name: Tipo string. Obligatorio
            avatar: Tipo string (link de imagen). Opcional
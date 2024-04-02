const SUCCESSFULL = [
  {
    CODE: 200,
    MESSAGE: "Operacion exitosa",
  },
  {
    CODE: 201,
    MESSAGE: "Creado correctamente",
  },
];

const CLIENT_ERRROS = [
  {
    CODE: 400,
    MESSAGE: "Error de peticion",
  },
  {
    CODE: 401,
    MESSAGE: "No autorizado",
  },
  {
    CODE: 403,
    MESSAGE: "No autorizado",
  },
  {
    CODE: 404,
    MESSAGE: "No encontrado",
  },
  {
    CODE: 409,
    MESSAGE: "Hubo un error",
  },
];

const DB_ERRORS = [
  {
    CODE: 1062,
    MESSAGE: "Ya existe un usuario con ese email",
  },
];

export const STATUS_CODE = { SUCCESSFULL, CLIENT_ERRROS, DB_ERRORS };

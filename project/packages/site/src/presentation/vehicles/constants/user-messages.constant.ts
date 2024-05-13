const errorOccurred = "Ocurrió un error al";
const success = "Unidad {action} exitosamente";
export const userMessages =  Object.freeze({
    error:{
        load: `${errorOccurred} al cargar las unidades`,
        create: `${errorOccurred} al registrar la unidad`,
        update: `${errorOccurred} al actualizar la unidad`,
        delete: `${errorOccurred} al eliminar la unidad`
    },
    success:{
        create: `${success.replace('{action}','creada')}`,
        update: `${success.replace('{action}','actualizada')}`,
        delete: `${success.replace('{action}','eliminada')}`
    },
    info:{
        closeEditings: "Debe cancelar las filas en edición"
    }
})
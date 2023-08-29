export const formatDate = (date) => {
  const fecha = new Date(date);

  const opcionesDeFormato = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    // timeZoneName: 'short'
  };

  const fechaFormateada = fecha.toLocaleDateString("es-ES", opcionesDeFormato);
  return fechaFormateada;
};

export const DateFormatYMD = (fechaStr) => {

  const fecha = new Date(fechaStr);
  console.log(fechaStr)

  const año = fecha.getUTCFullYear().toString().slice(2);
  const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0");
  const dia = fecha.getUTCDate().toString().padStart(2, "0");

  const fechaFormateada = `${año}/${mes}/${dia}`;
  console.log(fechaFormateada)
  return fechaFormateada
};

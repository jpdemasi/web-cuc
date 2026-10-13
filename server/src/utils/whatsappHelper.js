export const generarTextoPedido = (items, total) => {
  let mensaje = "¡Hola Unidos por el Calzado! Quiero hacer este pedido:%0A%0A";
  items.forEach((item) => {
    mensaje += `👟 *${item.nombre}* - Talle: ${item.talle} x ${item.cantidad} ($${item.precio * item.cantidad})%0A`;
  });
  mensaje += `%0A💰 *Total Estimado:* $${total}%0A%0A¿Tienen disponibilidad?`;
  return mensaje;
};

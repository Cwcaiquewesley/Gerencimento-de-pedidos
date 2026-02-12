import pool from '../config/database.js'

export async function calcular_total_pedido(idPedido) {
    const query = `SELECT calcular_total_pedido($1) as total`
    const { rows } = await pool.query(query, [idPedido])
    return { rows }
}

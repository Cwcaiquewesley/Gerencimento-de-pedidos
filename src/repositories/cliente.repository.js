import pool from '../config/database.js'

export async function cadastrar_cliente(dados) {
    const query = `
        INSERT INTO "Cliente" ("nomeCliente", "contato", "documento")
        VALUES ($1, $2, $3)
        RETURNING *
    `
    const { rows } = await pool.query(query, [dados.nomeCliente, dados.contato, dados.documento])
    return { rows }
}

export async function listar_clientes() {
    const { rows } = await pool.query('SELECT * FROM "Cliente"')
    return { rows }
}

export async function buscar_cliente(id) {
    const { rows } = await pool.query('SELECT * FROM "Cliente" WHERE "idCliente" = $1', [id])
    return { rows }
}

export async function atualizar_cliente(id, dados) {
    const campos = []
    const valores = []
    let contador = 1

    if (dados.nomeCliente) {
        campos.push(`"nomeCliente" = $${contador++}`)
        valores.push(dados.nomeCliente)
    }
    if (dados.contato) {
        campos.push(`"contato" = $${contador++}`)
        valores.push(dados.contato)
    }
    if (dados.documento) {
        campos.push(`"documento" = $${contador++}`)
        valores.push(dados.documento)
    }

    if (campos.length === 0) {
        return buscar_cliente(id)
    }

    valores.push(id)
    const query = `
        UPDATE "Cliente"
        SET ${campos.join(', ')}
        WHERE "idCliente" = $${contador}
        RETURNING *
    `
    const { rows } = await pool.query(query, valores)
    return { rows }
}

export async function deletar_cliente(id) {
    await pool.query('DELETE FROM "Cliente" WHERE "idCliente" = $1', [id])
    return { rows: [{ id }] }
}

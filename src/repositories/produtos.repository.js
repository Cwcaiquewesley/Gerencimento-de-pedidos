import pool from '../config/database.js'

export async function cadastrar_produto(dados) {
  const query = `
        INSERT INTO Produtos (nomeProduto, tipo, valor, quantidade, status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `
  const { rows } = await pool.query(query, [
    dados.nomeProduto,
    dados.tipo,
    dados.valor,
    dados.quantidade,
    dados.status
  ])
  return { rows }
}

export async function listar_produtos() {
  const { rows } = await pool.query('SELECT * FROM Produtos')
  return { rows }
}

export async function buscar_produto(id) {
  const { rows } = await pool.query('SELECT * FROM Produtos WHERE idProduto = $1', [id])
  return { rows }
}

export async function atualizar_produto(id, dados) {
  const campos = []
  const valores = []
  let contador = 1

  if (dados.nomeProduto !== undefined) {
    campos.push(`nomeProduto = $${contador++}`)
    valores.push(dados.nomeProduto)
  }
  if (dados.tipo !== undefined) {
    campos.push(`tipo = $${contador++}`)
    valores.push(dados.tipo)
  }
  if (dados.valor !== undefined) {
    campos.push(`valor = $${contador++}`)
    valores.push(dados.valor)
  }
  if (dados.quantidade !== undefined) {
    campos.push(`quantidade = $${contador++}`)
    valores.push(dados.quantidade)
  }
  if (dados.status !== undefined) {
    campos.push(`status = $${contador++}`)
    valores.push(dados.status)
  }

  if (campos.length === 0) {
    return buscar_produto(id)
  }

  valores.push(id)
  const query = `
        UPDATE Produtos
        SET ${campos.join(', ')}
        WHERE idProduto = $${contador}
        RETURNING *
    `
  const { rows } = await pool.query(query, valores)
  return { rows }
}

export async function deletar_produto(id) {
  await pool.query('DELETE FROM Produtos WHERE idProduto = $1', [id])
  return { rows: [{ id }] }
}

import pool from '../config/database.js';

export async function cadastrar_pedido_com_procedure(dados) {

  await pool.query(`
    DO $$ 
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tipo_item_pedido') THEN
            CREATE TYPE tipo_item_pedido AS (idProduto INT, quantidade INT);
        END IF;
    END $$;
  `);


  const itensArrayLiteral =
    "ARRAY[" +
    dados.itens
      .map((i) => `(${Number(i.idProduto)}, ${Number(i.quantidade)})`)
      .join(", ") +
    "]::tipo_item_pedido[]";

  const query = `CALL cadastrar_pedido($1, $2, ${itensArrayLiteral})`;

  await pool.query(query, [dados.idCliente, dados.local]);

  return { rows: [{ mensagem: "Pedido cadastrado com sucesso" }] };
}

export async function listar_pedidos() {
  const { rows } = await pool.query('SELECT * FROM "Pedido"');
  return { rows };
}

export async function buscar_pedido(id) {

  const queryPedido = `
    SELECT p.*, c."nomeCliente"
    FROM "Pedido" p
    JOIN "Cliente" c ON p."idCliente" = c."idCliente"
    WHERE p."idPedido" = $1
  `;
  const resultPedido = await pool.query(queryPedido, [id]);

  if (resultPedido.rows.length === 0) {
    return { rows: [] };
  }

  const pedido = resultPedido.rows[0];

  const queryItens = `
    SELECT ip.*, pr."nomeProduto" as produto_nome
    FROM "ItemPedido" ip
    JOIN "Produto" pr ON ip."idProduto" = pr."idProduto"
    WHERE ip."idPedido" = $1
  `;
  const resultItens = await pool.query(queryItens, [id]);

  pedido.itens = resultItens.rows;



  return { rows: [pedido] };
}

export async function atualizar_pedido(id, dados) {
  const campos = [];
  const valores = [];
  let contador = 1;

  if (dados.idCliente !== undefined) {
    campos.push(`"idCliente" = $${contador++}`);
    valores.push(dados.idCliente);
  }
  if (dados.local !== undefined) {
    campos.push(`"local" = $${contador++}`);
    valores.push(dados.local);
  }
  if (dados.horaPedido !== undefined) {
    campos.push(`"horaPedido" = $${contador++}`);
    valores.push(dados.horaPedido);
  }
  if (dados.horaEntrega !== undefined) {
    campos.push(`"horaEntrega" = $${contador++}`);
    valores.push(dados.horaEntrega);
  }
  if (dados.valorTotal !== undefined) {
    campos.push(`"valorTotal" = $${contador++}`);
    valores.push(dados.valorTotal);
  }

  if (campos.length === 0) {
    return buscar_pedido(id);
  }

  valores.push(id);
  const query = `
    UPDATE "Pedido"
    SET ${campos.join(', ')}
    WHERE "idPedido" = $${contador}
    RETURNING *
  `;

  const { rows } = await pool.query(query, valores);
  return { rows };
}

export async function deletar_pedido(id) {
  await pool.query('DELETE FROM "ItemPedido" WHERE "idPedido" = $1', [id]);
  await pool.query('DELETE FROM "Pedido" WHERE "idPedido" = $1', [id]);

  return { rows: [{ id }] };
}

export async function entregar_pedido(idPedido, local) {
  await pool.query('CALL entregar_pedido($1, $2)', [idPedido, local]);

  // Retorna pedido atualizado
  return buscar_pedido(idPedido);
}

export async function listar_todos_os_itens() {
  const query = `
    SELECT ip.*, p."nomeProduto", pe."horaPedido", pe."idCliente", pe."local", pe."horaEntrega"
    FROM "ItemPedido" ip
    JOIN "Produto" p ON ip."idProduto" = p."idProduto"
    JOIN "Pedido" pe ON ip."idPedido" = pe."idPedido"
  `;
  const { rows } = await pool.query(query);
  return { rows };
}


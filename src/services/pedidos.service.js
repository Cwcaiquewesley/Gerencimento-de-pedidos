import * as pedidoRepository from '../repositories/pedidos.repository.js'
import * as produtoRepository from '../repositories/produtos.repository.js'
import * as clienteRepository from '../repositories/cliente.repository.js'


export async function cadastrar_pedido(dados) {
  const idCliente = Number(dados.idCliente)
  const local = String(dados.local ?? '').trim()
  const itens = dados.itens // array de { idProduto, quantidade }

  if (!Number.isInteger(idCliente) || idCliente <= 0) {
    throw new Error('ID do cliente inválido')
  }
  if (!local) {
    throw new Error('Local é obrigatório')
  }
  if (!Array.isArray(itens) || itens.length === 0) {
    throw new Error('Itens são obrigatórios')
  }

  for (const item of itens) {
    const idProduto = Number(item.idProduto)
    const quantidade = Number(item.quantidade)
    if (!Number.isInteger(idProduto) || idProduto <= 0) {
      throw new Error('ID de produto inválido')
    }
    if (!Number.isInteger(quantidade) || quantidade <= 0) {
      throw new Error('Quantidade inválida')
    }
  }

  const result = await pedidoRepository.cadastrar_pedido_com_procedure({
    idCliente,
    local,
    itens
  })

 
  return result.rows?.[0] ?? { mensagem: 'Pedido cadastrado com sucesso' }
}

export async function listar_pedidos() {
  const result = await pedidoRepository.listar_pedidos()
  return result.rows
}

export async function buscar_pedido(id) {
  const idPedido = Number(id)
  if (!Number.isInteger(idPedido) || idPedido <= 0) {
    throw new Error('ID inválido')
  }

  const result = await pedidoRepository.buscar_pedido(idPedido)
  return result.rows[0]
}

export async function atualizar_pedido(id, dados) {
  const idPedido = Number(id)
  if (!Number.isInteger(idPedido) || idPedido <= 0) {
    throw new Error('ID inválido')
  }

  const idProduto = dados.idProduto !== undefined ? Number(dados.idProduto) : undefined
  const idCliente = dados.idCliente !== undefined ? Number(dados.idCliente) : undefined
  const local = dados.local !== undefined ? String(dados.local).trim() : undefined
  const horaEntrega = dados.horaEntrega !== undefined
    ? (dados.horaEntrega ? new Date(dados.horaEntrega) : null)
    : undefined
  const quantidade = dados.quantidade !== undefined
    ? Number(dados.quantidade)
    : undefined

  if (idProduto !== undefined && (!Number.isInteger(idProduto) || idProduto <= 0)) {
    throw new Error('ID do produto inválido')
  }
  if (idCliente !== undefined && (!Number.isInteger(idCliente) || idCliente <= 0)) {
    throw new Error('ID do cliente inválido')
  }
  if (local === '') {
    throw new Error('Local não pode ser vazio')
  }
  if (horaEntrega instanceof Date && isNaN(horaEntrega.getTime())) {
    throw new Error('Hora de entrega inválida')
  }
  if (quantidade !== undefined && (!Number.isInteger(quantidade) || quantidade <= 0)) {
    throw new Error('Quantidade inválida')
  }

  const dadosAtualizar = {}

  if (idProduto !== undefined) dadosAtualizar.idProduto = idProduto
  if (idCliente !== undefined) dadosAtualizar.idCliente = idCliente
  if (local !== undefined) dadosAtualizar.local = local
  if (horaEntrega !== undefined) dadosAtualizar.horaEntrega = horaEntrega
  if (quantidade !== undefined) dadosAtualizar.quantidade = quantidade

 
  if (dadosAtualizar.idProduto !== undefined || dadosAtualizar.quantidade !== undefined) {
    const pedidoAtual = await pedidoRepository.buscar_pedido(idPedido)
    const pedido = pedidoAtual.rows[0]
    if (!pedido) throw new Error('Pedido não encontrado')

    const novoIdProduto = dadosAtualizar.idProduto ?? pedido.idProduto
    const novaQuantidade = dadosAtualizar.quantidade ?? pedido.quantidade

    const produtoResult = await produtoRepository.buscar_produto(novoIdProduto)
    if (!produtoResult || !produtoResult.rows || !produtoResult.rows[0]) {
      throw new Error('Produto não encontrado')
    }
    const produto = produtoResult.rows[0]

    dadosAtualizar.valorTotal = calculoTotalService.calcularSubtotal(
      novaQuantidade,
      produto.valor
    )
  }

  const result = await pedidoRepository.atualizar_pedido(idPedido, dadosAtualizar)
  return result.rows[0]
}

export async function deletar_pedido(id) {
  const idPedido = Number(id)
  if (!Number.isInteger(idPedido) || idPedido <= 0) {
    throw new Error('ID inválido')
  }

  const result = await pedidoRepository.deletar_pedido(idPedido)
  return result.rows[0]
}


export async function entregar_pedido(id, dados) {
  const idPedido = Number(id)
  if (!Number.isInteger(idPedido) || idPedido <= 0) {
    throw new Error('ID inválido')
  }

  const local = String(dados.local ?? '').trim()
  if (!local) {
    throw new Error('Local é obrigatório')
  }

  const result = await pedidoRepository.entregar_pedido_com_procedure(idPedido, local)
  return result.rows[0]
}


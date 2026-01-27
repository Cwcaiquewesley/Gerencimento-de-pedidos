import { FLOAT } from 'sequelize'
import * as produtoRepository from '../repositories/produtos.repository.js'

export async function cadastrar_produto(dados) {
  const nomeProduto = String(dados.nomeProduto ?? '').trim()
  const tipo = String(dados.tipo ?? '').trim()
  const valor = Number(dados.valor)
  const quantidade = Number(dados.quantidade)
  const status = dados.status === undefined ? true : Boolean(dados.status)

  if (!nomeProduto) throw new Error('nomeProduto é obrigatório')
  if (!tipo) throw new Error('tipo é obrigatório')
  if (!Number.isFinite(valor) || valor < 0) throw new Error('valor inválido')
  if (!Number.isInteger(quantidade) || quantidade < 0) throw new Error('quantidade inválida')

  const result = await produtoRepository.cadastrar_produto({
    nomeProduto,
    tipo,
    valor,
    quantidade,
    status
  })
  return result.rows[0]
}



export async function listar_produtos() {
    const result = await produtoRepository.listar_produtos()
    return result.rows
}

export async function buscar_produto(id) {
    const idProduto = Number(id)
    if (!Number.isInteger(idProduto) || idProduto <= 0) throw new Error('ID inválido')

    const result = await produtoRepository.buscar_produto(idProduto)
    return result.rows[0]
}

export async function atualizar_produto(id, dados) {
    const idProduto = Number(id)
        if (!Number.isInteger(idProduto) || idProduto <= 0) throw new Error('ID inválido')
    
        const nomeProduto = dados.nomeProduto ? String(dados.nomeProduto).trim() : undefined
        const tipo = dados.tipo ? String(dados.tipo).trim() : undefined
        const valor = dados.valor ? Number(dados.valor) : undefined
        const quantidade = dados.quantidade ? Number(dados.quantidade) : undefined
        const status = dados.status ? Boolean(dados.status) : undefined
    
        if (nomeProduto === '') throw new Error('nomeProduto não pode ser vazio')
        if (tipo === '') throw new Error('tipo não pode ser vazio')
        if (valor === '') throw new Error('valor não pode ser vazio')
        if (quantidade === '') throw new Error('quantidade não pode ser vazio')
        if (status === '') throw new Error('status não pode ser vazio')
    
        const dadosAtualizar = {}
        if (nomeProduto) dadosAtualizar.nomeProduto = nomeProduto
        if (tipo) dadosAtualizar.tipo = tipo
        if (valor) dadosAtualizar.valor = valor
        if (quantidade) dadosAtualizar.quantidade = quantidade
        if (status) dadosAtualizar.status = status
    
        const result = await produtoRepository.atualizar_produto(idProduto, dadosAtualizar)
        return result.rows[0]
}

export async function deletar_produto(id) {
    const idProduto = Number(id)
    if (!Number.isInteger(idProduto) || idProduto <= 0) throw new Error('ID inválido')

    const result = await produtoRepository.deletar_produto(idProduto)
    return result.rows[0]
}
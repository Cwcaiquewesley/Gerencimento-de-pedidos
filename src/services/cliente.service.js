import * as clienteRepository from '../repositories/cliente.repository.js'

export async function cadastrar_cliente(dados) {
    const nome = String(dados.nome ?? '').trim()
    const contato = Number(dados.contato)
    const documento = String(dados.documento ?? '').trim()


    if (!nome) throw new Error('nome é obrigatório')
    if (!contato) throw new Error('tipo é obrigatório')

    const result = await produtoRepository.cadastrar_cliente({ nome, contato, documento })
    return result.rows[0]
}

export async function listar_cliente() {
    const result = await clienteRepository.listar_cliente()
    return result.rows

}

export async function  buscar_cliente(id) {
    const idCliente = Number(id)
    if (!Number.isInteger(idCliente) || idCliente < 0) throw new Error('ID inválido')

    const result = await clienteRepository.buscar_cliente(idCliente)
    return result.rows[0]
}

export async function  deletar_usuario(id) {
    const idCliente = Number(id)
    if (!Number.isInteger(idCliente) || idCliente < 0) throw new Error('ID inválido')

    const result = await deletar_usuario(idCliente)
    return result.rows[0]
}


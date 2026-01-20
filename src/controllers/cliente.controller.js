import * as clienteService from '../services/cliente.service.js'

export async function cadastrar_cliente(req, res) {
    try{
        const cliente = await clienteService.cadastrar_cliente(req.body)
        return res.status(201).json(cliente)
    } catch(err) {
        return res.status(400).json({ erro: err.message})
    }
    
}

export async function listar_cliente(req, res) {
    try{
        const cliente = await clienteService.listar_cliente()
        return res.status(200).json(cliente)
    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
    
}

export async function buscar_cliente(req, res) {
    try {
        const id = Number(req.params.id)
        const cliente = await clienteService.buscar_cliente(id)
        
        if (!cliente) {
            return res.status(404).json({ erro: 'Cliente não encontrado'})
        }

        return res.status(200).json(cliente)
    } catch(err) {
        return res.status(500).json({ erro: err.message })
    }
}

export async function deletar_usuario(req, res) {
    try {
        const id = Number(req.params.id)
        const cliente = await clienteService.deletar_usuario(id)

        if (!cliente){
            return res.status(404).json({ erro: 'Produto não encontrado'})
        }

        return res.status(200).json(cliente)
    } catch (err) {
        return res.status(500).json({ erro: err.message})
    }
}
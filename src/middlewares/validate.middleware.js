export function validarProduto(req, res, next) {
    const { nome, tipo, valor, quantidade, status } = req.body

    if (nome !== undefined && (!nome || typeof nome !== 'string')) {
        return res.status(400).json({ erro: 'Nome deve ser uma string não vazia' })
    }

    if (tipo !== undefined && (!tipo || typeof tipo !== 'string')) {
        return res.status(400).json({ erro: 'Tipo deve ser uma string não vazia' })
    }

    if (valor !== undefined && (typeof valor !== 'number' || valor < 0)) {
        return res.status(400).json({ erro: 'Valor deve ser um número não negativo' })
    }

    if (quantidade !== undefined && (!Number.isInteger(quantidade) || quantidade < 0)) {
        return res.status(400).json({ erro: 'Quantidade deve ser um inteiro não negativo' })
    }

    if (status !== undefined && typeof status !== 'boolean') {
        return res.status(400).json({ erro: 'Status deve ser um booleano' })
    }

    next()
}

export function validarCliente(req, res, next) {
    const { nomeCliente, contato, documento } = req.body

    if (nomeCliente !== undefined && (!nomeCliente || typeof nomeCliente !== 'string')) {
        return res.status(400).json({ erro: 'Nome do cliente deve ser uma string não vazia' })
    }

    if (contato !== undefined && (!contato || typeof contato !== 'string')) {
        return res.status(400).json({ erro: 'Contato deve ser uma string não vazia' })
    }

    if (documento !== undefined && (!documento || typeof documento !== 'string')) {
        return res.status(400).json({ erro: 'Documento deve ser uma string não vazia' })
    }

    next()
}

export function validarID(req, res, next) {
    const { id } = req.params

    if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({ erro: 'ID deve ser um número inteiro positivo' })
    }

    next()
}

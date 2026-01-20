export function tratarErros(err, req, res, next) {
    console.error('Erro:', err.message)

    // Erros de validação ou lógica da aplicação
    if (err.message && err.message.includes('é obrigatório')) {
        return res.status(400).json({ erro: err.message })
    }

    if (err.message && err.message.includes('inválido')) {
        return res.status(400).json({ erro: err.message })
    }

    if (err.message && err.message.includes('não encontrado')) {
        return res.status(404).json({ erro: err.message })
    }

    // Erros de banco de dados
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ erro: 'Erro de validação no banco de dados', detalhes: err.errors })
    }

    if (err.name === 'SequelizeDatabaseError') {
        return res.status(500).json({ erro: 'Erro ao acessar o banco de dados' })
    }

    // Erro genérico
    return res.status(500).json({ erro: 'Erro interno do servidor', mensagem: err.message })
}

export function rota404(req, res) {
    res.status(404).json({ erro: 'Rota não encontrada' })
}

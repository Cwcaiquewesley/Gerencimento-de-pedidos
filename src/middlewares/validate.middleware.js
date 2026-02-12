export function validarID(req, res, next) {
    const id = req.params.id

    if (!id || isNaN(id) || Number(id) <= 0) {
        return res.status(400).json({ erro: 'ID inválido' })
    }

    next()
}

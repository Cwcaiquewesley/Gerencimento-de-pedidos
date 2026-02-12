import express from 'express'
import clientesRoutes from './routes/clientes.routes.js'
import produtosRoutes from './routes/produtos.routes.js'
import pedidosRoutes from './routes/pedidos.routes.js'

const app = express()

app.use(express.json())
app.use('/api/v1', clientesRoutes)
app.use('/api/v1', produtosRoutes)
app.use('/api/v1', pedidosRoutes)

export default app
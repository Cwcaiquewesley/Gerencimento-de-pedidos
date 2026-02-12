# Relatório de Correções do Projeto 📋

## Erros Encontrados e Corrigidos

### ✅ 1. ERRO NA FUNÇÃO SQL (function.sql - Linha 1)
**Problema:**
```sql
RETURNS NUMERIC AS $$-  ❌ Hífen fora do lugar
```

**Solução:**
```sql
RETURNS NUMERIC AS $$   ✅ Corrigido
```

---

### ✅ 2. IMPORT INCORRETO E ROTAS FALTANDO (app.js)
**Problema:**
- Importava `pedidoRoutes` (arquivo não existe)
- Faltavam rotas de clientes e produtos
- Sem prefixo de versão da API

**Solução:**
```javascript
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
```

---

### ✅ 3. MIDDLEWARE AUSENTE (middlewares/validate.middleware.js)
**Problema:**
- Arquivo não existia
- Todas as rotas referenciavam `validarID`

**Solução:**
Criado arquivo com função de validação:
```javascript
export function validarID(req, res, next) {
    const id = req.params.id

    if (!id || isNaN(id) || Number(id) <= 0) {
        return res.status(400).json({ erro: 'ID inválido' })
    }

    next()
}
```

---

### ✅ 4. FUNÇÃO NÃO DEFINIDA (clientes.service.js)
**Problema:**
- Função `validarEmail()` era chamada mas não existia

**Solução:**
Adicionada função de validação:
```javascript
function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regexEmail.test(email)
}
```

---

### ✅ 5. ERROS NO CONTROLLER (produtos.controller.js)
**Problema:**
- Faltava `return` na função `deletar_produto()`
- Importação desnecessária do Sequelize

**Solução:**
Adicionado `return` e removida importação desnecessária

---

### ✅ 6. DEPENDÊNCIAS DESNECESSÁRIAS (package.json)
**Problema:**
```json
"sequelize": "^6.37.7",  ❌ Não é usado
"sqlite3": "^5.1.7",      ❌ Não é usado
"ejs": "^4.0.1"           ❌ Não é usado
```

**Solução:**
Removidas as dependências não utilizadas. Mantidas apenas:
```json
"dependencies": {
    "dotenv": "^17.2.4",
    "express": "^5.2.1",
    "pg": "^8.17.1"
}
```

---

### ✅ 7. INTEGRAÇÃO DA FUNÇÃO calcular_total_pedido()

**Criados:**

1. **Novo repositório** (`src/repositories/calcular.repository.js`):
```javascript
export async function calcular_total_pedido(idPedido) {
    const query = `SELECT calcular_total_pedido($1) as total`
    const { rows } = await pool.query(query, [idPedido])
    return { rows }
}
```

2. **Novo serviço** (adicionado em `src/services/pedidos.service.js`):
```javascript
export async function obter_total_pedido(id) {
  const idPedido = Number(id)
  if (!Number.isInteger(idPedido) || idPedido <= 0) {
    throw new Error("ID inválido")
  }

  const result = await calcularRepository.calcular_total_pedido(idPedido)
  return result.rows[0]
}
```

3. **Novo endpoint** (adicionado em `src/controllers/pedidos.controller.js`):
```javascript
export async function obter_total_pedido(req, res) {
    try {
        const id = Number(req.params.id)
        const total = await pedidosService.obter_total_pedido(id)

        if (!total) {
            return res.status(404).json({ erro: 'Total do pedido não encontrado' })
        }

        return res.status(200).json(total)
    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}
```

4. **Nova rota** (adicionada em `src/routes/pedidos.routes.js`):
```javascript
router.get('/pedidos/:id/total', validarID, pedidosController.obter_total_pedido)
```

---

## 🔗 Como Usar a Função calcular_total_pedido

### Endpoint
```
GET /api/v1/pedidos/1/total
```

### Resposta
```json
{
  "total": 450.50
}
```

### Exemplo com cURL
```bash
curl -X GET http://localhost:3000/api/v1/pedidos/1/total
```

---

## 📝 Resumo das Alterações

| Arquivo | Status | Descrição |
|---------|--------|-----------|
| `sql/function.sql` | ✅ Corrigido | Removido hífen da sintaxe |
| `src/app.js` | ✅ Corrigido | Importações e rotas corretas |
| `src/middlewares/validate.middleware.js` | ✅ Criado | Middleware de validação |
| `src/services/clientes.service.js` | ✅ Corrigido | Adicionada função validarEmail |
| `src/controllers/produtos.controller.js` | ✅ Corrigido | Adicionado return faltante |
| `package.json` | ✅ Corrigido | Removidas dependências desnecessárias |
| `src/repositories/calcular.repository.js` | ✅ Criado | Repositório para calcular_total_pedido |
| `src/services/pedidos.service.js` | ✅ Corrigido | Adicionada função para obter total |
| `src/controllers/pedidos.controller.js` | ✅ Corrigido | Adicionado endpoint para total |
| `src/routes/pedidos.routes.js` | ✅ Corrigido | Adicionada rota para total |

---

## 🚀 Próximos Passos

1. Instalar dependências: `npm install`
2. Criar variaveis de ambiente corretas no `.env`
3. Executar scripts SQL para criar as tabelas, procedures e functions no banco
4. Iniciar servidor: `npm start` ou `npm run dev`

---


CREATE TABLE Cliente (
    idCliente SERIAL PRIMARY KEY,
    nomeCliente VARCHAR(255) NOT NULL,
    contato VARCHAR(20) NOT NULL,
    documento VARCHAR(20) NOT NULL UNIQUE,
    dataCadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Produto (
    idProduto SERIAL PRIMARY KEY,
    nomeProduto VARCHAR(255) NOT NULL,
    tipo VARCHAR(100) NOT NULL,
    valor FLOAT NOT NULL CHECK (valor >= 0),
    quantidade INT NOT NULL CHECK (quantidade >= 0),
    status BOOLEAN DEFAULT TRUE,
    dataCadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Pedido (
    idPedido SERIAL PRIMARY KEY,
    idCliente INT NOT NULL REFERENCES Cliente(idCliente),
    local VARCHAR(255) NOT NULL,
    horaPedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    horaEntrega TIMESTAMP NULL,
    valorTotal FLOAT DEFAULT 0
);

CREATE TABLE ItemPedido (
    idItem SERIAL PRIMARY KEY,
    idPedido INT NOT NULL REFERENCES Pedido(idPedido),
    idProduto INT NOT NULL REFERENCES Produto(idProduto),
    quantidade INT NOT NULL CHECK (quantidade > 0),
    valorUnitario DECIMAL(10,2) NOT NULL CHECK (valorUnitario >= 0)
);

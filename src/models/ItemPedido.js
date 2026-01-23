import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

export const ItemPedido = sequelize.define('ItemPedido', {
  idItem: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idPedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Pedido', key: 'idPedido' }
  },
  idProduto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Produto', key: 'idProduto' }
  },
  quantidade: DataTypes.INTEGER,
  valorUnitario: DataTypes.FLOAT
}, {
  tableName: 'ItemPedido',
  timestamps: false
})
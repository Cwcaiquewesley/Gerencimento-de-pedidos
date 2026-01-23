import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

export const Pedido = sequelize.define('Pedido', {
  idPedido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idCliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Cliente', key: 'idCliente' }
  },
  local: DataTypes.STRING,
  horaPedido: DataTypes.DATE,
  horaEntrega: DataTypes.DATE,
  valorTotal: DataTypes.FLOAT
}, {
  tableName: 'Pedido',
  timestamps: false
})
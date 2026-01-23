import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

export const Produto = sequelize.define('Produto', {
  idProduto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nomeProduto: DataTypes.STRING,
  tipo: DataTypes.STRING,
  valor: DataTypes.FLOAT,
  quantidade: DataTypes.INTEGER,
  status: DataTypes.BOOLEAN
}, {
  tableName: 'Produto',
  timestamps: false
})
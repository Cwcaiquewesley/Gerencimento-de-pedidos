import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

export const Cliente = sequelize.define('Cliente', {
  idCliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nomeCliente: DataTypes.STRING,
  contato: DataTypes.STRING,
  documento: DataTypes.STRING
}, {
  tableName: 'Cliente',
  timestamps: false
})
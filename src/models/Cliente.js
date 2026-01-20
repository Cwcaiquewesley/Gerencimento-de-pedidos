import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

// Os nomes das tabelas estão sujeitos a mudanças
export const Cliente = sequelize.define('Cliente', {
    nomeCliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contato: {
        type: DataTypes.STRING,
        allowNull: false
    },
    documento: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Cliente',
    timestamps: false
})

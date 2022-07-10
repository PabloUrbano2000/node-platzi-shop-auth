const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  // PARA OBTENER DATOS QUE NO ESTAN EN UNA BD
  // PERO SI AGREGAR AL OBJETO
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      // EL NOMBRE 'ITEMS' TIENE QUE SER IGUAL AL QUE ASOCIAMOS
      // EN LA PARTE INFERIOR
      if (this.items.length > 0) {
        return this.items.reduce((total, item) => {
          // PRICE SE OBTIENE DEL OBJETO, Y LA ASOCION CON LA TABLA
          // TERCIARIA ME DEVUELVE EL AMOUNT
          return total + item.price * item.OrderProduct.amount;
        }, 0);
      }
      return 0;
    },
  },
};

class Order extends Model {
  static associate(models) {
    // UNA ORDEN PERTENECE A UN CLIENTE
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
    // UNA ORDEN TIENE MUCHOS ITEMS
    this.belongsToMany(models.Product, {
      as: 'items',
      // TABLA TERNARIA
      through: models.OrderProduct,
      // asocio a la tabla del mismo id de esta
      foreignKey: 'orderId',
      // asocio a la tabla que me tiene que traer los resultados
      otherKey: 'productId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    };
  }
}

module.exports = { ORDER_TABLE, OrderSchema, Order };

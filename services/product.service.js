const faker = require('faker');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');

// const pool = require('../libs/postgres.pool');
// const sequealize = require('../libs/sequelize');

const { models } = require('../libs/sequelize');

class ProductsService {
  constructor() {
    // this.products = [];
    // this.generate();
    // this.pool = pool;
    // this.pool.on('error', (err) => console.log(err));
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    // const query = 'SELECT * FROM tasks';
    // // const rta = await this.pool.query(query);
    // const [
    //   data,
    //   // , metadata
    // ] = await sequealize.query(query);
    const options = {
      include: ['category'],
      where: {},
    };
    const { limit, offset, price, price_min, price_max } = query || {};
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    if (price) {
      options.where.price = price;
    }

    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
        // TAMBIEN PODEMOS USAR OP.BETWEEN
        // [Op.between]: [price_min, price_max]
      };
    }

    const products = await models.Product.findAll(options);

    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category'],
    });
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { rta: true };
  }
}

module.exports = ProductsService;

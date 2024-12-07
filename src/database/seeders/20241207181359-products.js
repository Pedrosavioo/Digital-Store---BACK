'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserir Produtos
    const products = await queryInterface.bulkInsert(
      'product',
      [
        {
          enabled: true,
          name: 'Camiseta Básica',
          slug: 'camiseta-basica',
          stock: 100,
          description: 'Camiseta de algodão, modelo básico.',
          price: 49.9,
          price_with_discount: 39.9,
        },
        {
          enabled: true,
          name: 'Tênis Esportivo',
          slug: 'tenis-esportivo',
          stock: 50,
          description: 'Tênis confortável para atividades físicas.',
          price: 199.9,
          price_with_discount: 179.9,
        },
        {
          enabled: true,
          name: 'Notebook Dell',
          slug: 'notebook-dell',
          stock: 30,
          description: 'Notebook de alto desempenho para trabalho e lazer.',
          price: 2999.9,
          price_with_discount: 2799.9,
        },
        {
          enabled: true,
          name: 'Smartphone Samsung Galaxy',
          slug: 'smartphone-samsung-galaxy',
          stock: 80,
          description: 'Smartphone com câmera de alta definição e tela AMOLED.',
          price: 2499.9,
          price_with_discount: 2299.9,
        },
        {
          enabled: true,
          name: 'Fone de Ouvido Bluetooth',
          slug: 'fone-ouvido-bluetooth',
          stock: 120,
          description: 'Fone de ouvido sem fio com excelente qualidade de som.',
          price: 199.9,
          price_with_discount: 169.9,
        },
        {
          enabled: true,
          name: 'Cadeira de Escritório',
          slug: 'cadeira-escritorio',
          stock: 60,
          description: 'Cadeira ergonômica para escritório, confortável e ajustável.',
          price: 499.9,
          price_with_discount: 449.9,
        },
        {
          enabled: true,
          name: 'Geladeira Brastemp',
          slug: 'geladeira-brastemp',
          stock: 25,
          description: 'Geladeira com design moderno e eficiência energética.',
          price: 2199.9,
          price_with_discount: 1999.9,
        },
        {
          enabled: true,
          name: 'Micro-ondas Panasonic',
          slug: 'micro-ondas-panasonic',
          stock: 45,
          description: 'Micro-ondas de 30L com diversas funções.',
          price: 899.9,
          price_with_discount: 799.9,
        },
        {
          enabled: true,
          name: 'Cafeteira Nespresso',
          slug: 'cafeteira-nespresso',
          stock: 70,
          description: 'Cafeteira de cápsulas, ideal para preparar café expresso.',
          price: 699.9,
          price_with_discount: 599.9,
        },
        {
          enabled: true,
          name: 'Air Fryer Philips Walita',
          slug: 'air-fryer-philips',
          stock: 40,
          description: 'Air fryer com tecnologia de circulação de ar quente.',
          price: 699.9,
          price_with_discount: 649.9,
        },
      ],
    );

    // Inserir Imagens
    await queryInterface.bulkInsert('product_images', [
      {
        product_id: 1,
        enabled: true,
        path: btoa('src/image1.png'),
      },
      {
        product_id: 2,
        enabled: true,
        path: btoa('src/image2.png'),
      },
      {
        product_id: 3,
        enabled: true,
        path: btoa('src/image1.png'),
      },
      {
        product_id: 4,
        enabled: true,
        path: btoa('src/image2.png'),
      },
      {
        product_id: 5,
        enabled: true,
        path: btoa('src/image1.png'),
      },
      {
        product_id: 6,
        enabled: true,
        path: btoa('src/image2.png'),
      },
      {
        product_id: 7,
        enabled: true,
        path: btoa('src/image1.png'),
      },
      {
        product_id: 8,
        enabled: true,
        path: btoa('src/image2.png'),
      },
      {
        product_id: 9,
        enabled: true,
        path: btoa('src/image1.png'),
      },
      {
        product_id: 10,
        enabled: true,
        path: btoa('src/image2.png'),
      },
    ]);

    // Inserir Opções
    await queryInterface.bulkInsert('product_options', [
      {
        product_id: 1,
        title: 'Cor',
        shape: 'square',
        radius: 4,
        type: 'text',
        values: JSON.stringify(['PP', 'GG', 'M']),
      },
      {
        product_id: 2,
        title: 'Tamanho',
        shape: 'circle',
        radius: 4,
        type: 'color',
        values: JSON.stringify(['#000', '#333']),
      },
      {
        product_id: 3,
        title: 'Cor',
        shape: 'square',
        radius: 4,
        type: 'text',
        values: JSON.stringify(['Prata', 'Preto', 'Branco']),
      },
      {
        product_id: 4,
        title: 'Tamanho',
        shape: 'circle',
        radius: 4,
        type: 'text',
        values: JSON.stringify(['64GB', '128GB', '256GB']),
      },
      {
        product_id: 5,
        title: 'Cor',
        shape: 'square',
        radius: 4,
        type: 'color',
        values: JSON.stringify(['#000', '#fff', '#00f']),
      },
      {
        product_id: 6,
        title: 'Cor',
        shape: 'square',
        radius: 4,
        type: 'text',
        values: JSON.stringify(['Preto', 'Cinza', 'Bege']),
      },
      {
        product_id: 7,
        title: 'Capacidade',
        shape: 'square',
        radius: 4,
        type: 'text',
        values: JSON.stringify(['300L', '400L', '500L']),
      },
      {
        product_id: 8,
        title: 'Tamanho',
        shape: 'circle',
        radius: 4,
        type: 'text',
        values: JSON.stringify(['30L', '40L', '50L']),
      },
      {
        product_id: 9,
        title: 'Cor',
        shape: 'square',
        radius: 4,
        type: 'color',
        values: JSON.stringify(['#000', '#f00', '#00f']),
      },
      {
        product_id: 10,
        title: 'Cor',
        shape: 'circle',
        radius: 4,
        type: 'color',
        values: JSON.stringify(['#ff0', '#0f0', '#f00']),
      },
    ]);
    

    // Relacionar Categorias a Produtos
    await queryInterface.bulkInsert('product_category_options', [
      { product_id: 1, category_id: 2 }, 
      { product_id: 2, category_id: 1 }, 
      { product_id: 3, category_id: 4 }, 
      { product_id: 4, category_id: 4 }, 
      { product_id: 5, category_id: 4 }, 
      { product_id: 6, category_id: 6 }, 
      { product_id: 7, category_id: 6 }, 
      { product_id: 8, category_id: 6 }, 
      { product_id: 9, category_id: 6 }, 
      { product_id: 10, category_id: 6 }, 
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('product_category_options', null, {});
    await queryInterface.bulkDelete('product_options', null, {});
    await queryInterface.bulkDelete('product_images', null, {});
    await queryInterface.bulkDelete('product', null, {});
  },
};

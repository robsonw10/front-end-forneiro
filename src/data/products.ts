export interface Product {
  id: string;
  name: string;
  description: string;
  price: {
    broto: number;
    grande: number;
  };
  category: 'pizzas-promocionais' | 'pizzas-premium' | 'pizzas-tradicionais' | 'pizzas-especiais' | 'pizzas-doces' | 'bebidas' | 'adicionais' | 'bordas' | 'combos';
  isPopular?: boolean;
  ingredients?: string[];
  portions?: string;
  drinkOptions?: string[];
  pizzaCount?: number;
}

export const products: Product[] = [
  // COMBOS
  {
    id: 'combo-casal',
    name: 'Pizza Combo Casal',
    description: '1 Pizza grande (sabores 1 ao 10) + Borda requeijão grátis + Refrigerante 2L',
    price: { broto: 63.99, grande: 63.99 },
    category: 'combos',
    isPopular: true,
    ingredients: ['Pizza Grande', 'Borda Requeijão', 'Refrigerante 2L'],
    drinkOptions: ['coca-cola', 'sprite', 'fanta-laranja', 'fanta-uva']
  },
  {
    id: 'combo-promocao',
    name: 'Combo Família',
    description: '2 Pizzas + Borda requeijão + Refrigerante 2L',
    price: { broto: 114.99, grande: 114.99 },
    category: 'combos',
    isPopular: true,
    ingredients: ['2 Pizzas', 'Borda Requeijão', 'Refrigerante 2L'],
    drinkOptions: ['coca-cola', 'sprite', 'fanta-laranja', 'fanta-uva'],
    pizzaCount: 2
  },

  // PIZZAS PROMOCIONAIS
  {
    id: 'pizza-alema',
    name: 'Alemã',
    description: 'Milho fresco, ervilha fresca, tomate e mussarela',
    price: { broto: 43.99, grande: 43.99 },
    category: 'pizzas-promocionais',
    ingredients: ['Milho fresco', 'Ervilha fresca', 'Tomate', 'Mussarela'],
  },
  {
    id: 'pizza-argentina',
    name: 'Argentina', 
    description: 'Presunto, milho fresco, mussarela',
    price: { broto: 43.99, grande: 43.99 },
    category: 'pizzas-promocionais',
    ingredients: ['Presunto', 'Milho fresco', 'Mussarela'],
  },
  {
    id: 'pizza-bauru',
    name: 'Bauru',
    description: 'Presunto, tomate, mussarela',
    price: { broto: 43.99, grande: 43.99 },
    category: 'pizzas-promocionais',
    ingredients: ['Presunto', 'Tomate', 'Mussarela'],
  },
  {
    id: 'pizza-calab-acebol',
    name: 'Calab. Acebol',
    description: 'Calabresa fatiada, cebola',
    price: { broto: 43.99, grande: 43.99 },
    category: 'pizzas-promocionais',
    ingredients: ['Calabresa fatiada', 'Cebola'],
  },
  {
    id: 'pizza-calacatu',
    name: 'Calacatu',
    description: 'Calabresa fatiada, cebola, catupiry à escolha dallora ou scala',
    price: { broto: 43.99, grande: 55.99 },
    category: 'pizzas-promocionais',
    ingredients: ['Calabresa fatiada', 'Cebola', 'Catupiry'],
  },
  {
    id: 'pizza-italiana',
    name: 'Italiana',
    description: 'Ervilha fresca, tomate, mussarela',
    price: { broto: 43.99, grande: 43.99 },
    category: 'pizzas-promocionais',
    ingredients: ['Ervilha fresca', 'Tomate', 'Mussarela'],
  },
  {
    id: 'pizza-milho-mussa',
    name: 'Milho e Mussa',
    description: 'Milho, tomate, mussarela',
    price: { broto: 43.99, grande: 43.99 },
    category: 'pizzas-promocionais',
    ingredients: ['Milho', 'Tomate', 'Mussarela'],
  },
  {
    id: 'pizza-presuntocatu',
    name: 'Presuntocatu',
    description: 'Presunto, tomate e catupiry à escolha dallora ou scala',
    price: { broto: 43.99, grande: 55.99 },
    category: 'pizzas-promocionais',
    ingredients: ['Presunto', 'Tomate', 'Catupiry'],
  },
  {
    id: 'pizza-romeu-julieta-prom',
    name: 'Romeu e Julieta',
    description: 'Mussarela e goiabada',
    price: { broto: 43.99, grande: 43.99 },
    category: 'pizzas-promocionais',
    ingredients: ['Mussarela', 'Goiabada'],
  },
  {
    id: 'pizza-seleta',
    name: 'Seléta',
    description: 'Milho fresco, ervilha fresca, cebola, mussarela',
    price: { broto: 43.99, grande: 43.99 },
    category: 'pizzas-promocionais',
    ingredients: ['Milho fresco', 'Ervilha fresca', 'Cebola', 'Mussarela'],
    
  },

  // PIZZAS TRADICIONAIS
  {
    id: 'pizza-atum',
    name: 'Atum',
    description: 'Atum original, cebola, tomate, mussarela',
    price: { broto: 60.99, grande: 60.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Atum original', 'Cebola', 'Tomate', 'Mussarela']
  },
  {
    id: 'pizza-americana',
    name: 'Americana',
    description: 'Presunto, champignon, cebola, mussarela',
    price: { broto: 58.99, grande: 58.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Presunto', 'Champignon', 'Cebola', 'Mussarela']
  },
  {
    id: 'pizza-alho-oleo',
    name: 'Alho e Óleo',
    description: 'Tomate, mussarela, alho gratinado',
    price: { broto: 52.99, grande: 52.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Tomate', 'Mussarela', 'Alho gratinado']
  },
  {
    id: 'pizza-bacon',
    name: 'Bacon',
    description: 'Mussarela, cebola, bacon',
    price: { broto: 60.99, grande: 60.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Mussarela', 'Cebola', 'Bacon']
  },
  {
    id: 'pizza-baiana',
    name: 'Baiana',
    description: 'Calabresa moída, ovo, cebola, mussarela, pimenta',
    price: { broto: 54.99, grande: 54.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Calabresa moída', 'Ovo', 'Cebola', 'Mussarela', 'Pimenta']
  },
  {
    id: 'pizza-brocolis',
    name: 'Brócolis',
    description: 'Brócolis, mussarela, bacon, alho gratinado',
    price: { broto: 67.99, grande: 67.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Brócolis', 'Mussarela', 'Bacon', 'Alho gratinado']
  },
  {
    id: 'pizza-calab-mussa',
    name: 'Calab e Mussa',
    description: 'Calabresa fatiada, cebola, coberta de mussarela',
    price: { broto: 50.99, grande: 50.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Calabresa fatiada', 'Cebola', 'Mussarela']
  },
  {
    id: 'pizza-champignon',
    name: 'Champignon',
    description: 'Champignon, cebola, mussarela',
    price: { broto: 54.99, grande: 54.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Champignon', 'Cebola', 'Mussarela']
  },
  {
    id: 'pizza-dois-queijos',
    name: 'Dois Queijos',
    description: 'Catupiry à escolha dallora ou scala, tomate e mussarela',
    price: { broto: 51.99, grande: 62.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Catupiry', 'Tomate', 'Mussarela']
  },
  {
    id: 'pizza-frango-mussa',
    name: 'Frango e Mussa',
    description: 'Frango desfiado, tomate e mussarela',
    price: { broto: 57.99, grande: 57.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Frango desfiado', 'Tomate', 'Mussarela']
  },
  {
    id: 'pizza-frango-catupi',
    name: 'Frango e Catupi',
    description: 'Frango desfiado, catupiry à escolha dallora ou scala e mussarela',
    price: { broto: 57.99, grande: 69.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Frango desfiado', 'Catupiry', 'Mussarela']
  },
  {
    id: 'pizza-francesa',
    name: 'Francesa',
    description: 'Presunto, ervilha fresca, champignon, ovo, palmito, cebola, mussarela',
    price: { broto: 65.99, grande: 65.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Presunto', 'Ervilha fresca', 'Champignon', 'Ovo', 'Palmito', 'Cebola', 'Mussarela']
  },
  {
    id: 'pizza-lombinho',
    name: 'Lombinho',
    description: 'Lombo canadense, cebola, mussarela',
    price: { broto: 55.99, grande: 55.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Lombo canadense', 'Cebola', 'Mussarela']
  },
  {
    id: 'pizza-marguerita',
    name: 'Marguerita',
    description: 'Mussarela, parmesão, tomate, manjericão',
    price: { broto: 51.99, grande: 51.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Mussarela', 'Parmesão', 'Tomate', 'Manjericão']
  },
  {
    id: 'pizza-marguerita-alho-oleo',
    name: 'Marguerita Alho e Óleo',
    description: 'Mussarela, parmesão, tomate, manjericão e alho gratinado',
    price: { broto: 55.99, grande: 55.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Mussarela', 'Parmesão', 'Tomate', 'Manjericão', 'Alho gratinado']
  },
  {
    id: 'pizza-mussarela',
    name: 'Mussarela',
    description: 'Mussarela e rodelas de tomate',
    price: { broto: 51.99, grande: 51.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Mussarela', 'Tomate']
  },
  {
    id: 'pizza-milho-catupiri',
    name: 'Milho com Catupiri',
    description: 'Milho fresco, catupiry à escolha dallora ou scala, tomate e mussarela',
    price: { broto: 51.99, grande: 62.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Milho fresco', 'Catupiry', 'Tomate', 'Mussarela']
  },
  {
    id: 'pizza-napolitana',
    name: 'Napolitana',
    description: 'Mussarela, parmesão e tomate',
    price: { broto: 52.99, grande: 52.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Mussarela', 'Parmesão', 'Tomate']
  },
  {
    id: 'pizza-palmito-trad',
    name: 'Palmito',
    description: 'Mussarela, palmito e cebola',
    price: { broto: 53.99, grande: 53.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Mussarela', 'Palmito', 'Cebola']
  },
  {
    id: 'pizza-portuguesa',
    name: 'Portuguesa',
    description: 'Presunto, milho fresco, ervilha fresca, ovo, cebola e mussarela',
    price: { broto: 56.99, grande: 56.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Presunto', 'Milho fresco', 'Ervilha fresca', 'Ovo', 'Cebola', 'Mussarela']
  },
  {
    id: 'pizza-quatro-queijos-trad',
    name: 'Quatro Queijos',
    description: 'Catupiry à escolha dallora ou scala, mussarela, parmesão, provolone e tomate',
    price: { broto: 61.99, grande: 73.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Catupiry', 'Mussarela', 'Parmesão', 'Provolone', 'Tomate']
  },
  {
    id: 'pizza-toscana',
    name: 'Toscana',
    description: 'Calabresa moída, cebola e mussarela',
    price: { broto: 50.99, grande: 50.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Calabresa moída', 'Cebola', 'Mussarela']
  },
  {
    id: 'pizza-tres-queijos',
    name: 'Três Queijos',
    description: 'Catupiry à escolha dallora ou scala, mussarela, parmesão e tomate',
    price: { broto: 57.99, grande: 69.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Catupiry', 'Mussarela', 'Parmesão', 'Tomate']
  },
  {
    id: 'pizza-siciliana',
    name: 'Siciliana',
    description: 'Champignon, cebola, mussarela e bacon',
    price: { broto: 60.99, grande: 60.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Champignon', 'Cebola', 'Mussarela', 'Bacon']
  },
  {
    id: 'pizza-vegetariana-trad',
    name: 'Vegetariana',
    description: 'Brócolis, milho fresco, ervilha fresca, palmito, tomate e mussarela',
    price: { broto: 65.99, grande: 65.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Brócolis', 'Milho fresco', 'Ervilha fresca', 'Palmito', 'Tomate', 'Mussarela']
  },
  {
    id: 'pizza-frango-cheddar',
    name: 'Frango e Cheddar',
    description: 'Frango desfiado, cheddar scala e mussarela',
    price: { broto: 66.99, grande: 66.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Frango desfiado', 'Cheddar scala', 'Mussarela']
  },
  {
    id: 'pizza-brasileira',
    name: 'Brasileira',
    description: 'Frango desfiado, milho, catupiry à escolha dallora ou scala, tomate, cebola, mussarela, provolone',
    price: { broto: 69.99, grande: 81.99 },
    category: 'pizzas-tradicionais',
    ingredients: ['Frango desfiado', 'Milho', 'Catupiry', 'Tomate', 'Cebola', 'Mussarela', 'Provolone']
  },

  // PIZZAS PREMIUM
  {
    id: 'pizza-carijo',
    name: 'Carijo',
    description: 'Frango desfiado, milho, catupiry à escolha dallora ou scala, mussarela e batata palha',
    price: { broto: 65.99, grande: 77.99 },
    category: 'pizzas-premium',
    ingredients: ['Frango desfiado', 'Milho', 'Catupiry', 'Mussarela', 'Batata palha']
  },
  {
    id: 'pizza-cinco-queijos',
    name: 'Cinco Queijos',
    description: 'Catupiry à escolha dallora ou scala, mussarela, parmesão, provolone, gorgonzola e tomate',
    price: { broto: 66.99, grande: 78.99 },
    category: 'pizzas-premium',
    ingredients: ['Catupiry', 'Mussarela', 'Parmesão', 'Provolone', 'Gorgonzola', 'Tomate']
  },
  {
    id: 'pizza-frango-forneiro',
    name: 'Frango Forneiro',
    description: 'Frango desfiado, milho, champignon, palmito, mussarela',
    price: { broto: 69.99, grande: 81.99 },
    category: 'pizzas-premium',
    ingredients: ['Frango desfiado', 'Milho', 'Champignon', 'Palmito', 'Mussarela']
  },
  {
    id: 'pizza-frango-catupiry-bacon',
    name: 'Frango Catupiry com Bacon',
    description: 'Frango desfiado, catupiry à escolha dallora ou scala, bacon e mussarela',
    price: { broto: 67.99, grande: 79.99 },
    category: 'pizzas-premium',
    ingredients: ['Frango desfiado', 'Catupiry', 'Bacon', 'Mussarela']
  },
  {
    id: 'pizza-grega',
    name: 'Grega',
    description: 'Presunto, lombo, palmito, ervilha, catupiry à escolha dallora ou scala e mussarela',
    price: { broto: 69.99, grande: 81.99 },
    category: 'pizzas-premium',
    ingredients: ['Presunto', 'Lombo', 'Palmito', 'Ervilha', 'Catupiry', 'Mussarela']
  },
  {
    id: 'pizza-moda-carlinhos',
    name: 'Moda do Carlinhos',
    description: 'Frango, lombo, brócolis, catupiry, ovo presunto, bacon coberta de mussarela e catupiry à sua escolha dallora ou scala',
    price: { broto: 84.99, grande: 96.99 },
    category: 'pizzas-premium',
    ingredients: ['Frango', 'Lombo', 'Brócolis', 'Catupiry', 'Ovo', 'Presunto', 'Bacon', 'Mussarela']
  },
  {
    id: 'pizza-moda-casa',
    name: 'Moda da Casa',
    description: 'Presunto, bacon, palmito, tomate, ervilha, cebola, milho, ovos mussarela e catupiry à sua escolha dallora ou scala',
    price: { broto: 69.99, grande: 81.99 },
    category: 'pizzas-premium',
    ingredients: ['Presunto', 'Bacon', 'Palmito', 'Tomate', 'Ervilha', 'Cebola', 'Milho', 'Ovos', 'Mussarela', 'Catupiry']
  },
  {
    id: 'pizza-moda-cliente',
    name: 'Moda do Cliente',
    description: 'São 6 ingredientes da sua escolha',
    price: { broto: 71.99, grande: 79.99 },
    category: 'pizzas-premium',
    ingredients: ['6 ingredientes à escolha']
  },
  {
    id: 'pizza-moda-chefe',
    name: 'Moda do Chefe',
    description: 'Frango, calabresa ralada, cream cheese, mussarela e bacon',
    price: { broto: 85.99, grande: 96.99 },
    category: 'pizzas-premium',
    ingredients: ['Frango', 'Calabresa ralada', 'Cream cheese', 'Mussarela', 'Bacon']
  },
  {
    id: 'pizza-moda-patrao',
    name: 'Moda do Patrão',
    description: 'Frango desfiado, calabresa fatiada, milho fresco, palmito, catupiry scala, mussarela e bacon',
    price: { broto: 65.99, grande: 77.99 },
    category: 'pizzas-premium',
    ingredients: ['Frango desfiado', 'Calabresa fatiada', 'Milho fresco', 'Palmito', 'Catupiry scala', 'Mussarela', 'Bacon']
  },
  {
    id: 'pizza-portuguesa-forn',
    name: 'Portuguesa Forn',
    description: 'Presunto, milho, ervilha, palmito, cebola, ovo, catupiry à escolha dallora ou scala e mussarela',
    price: { broto: 46.99, grande: 65.99 },
    category: 'pizzas-premium',
    ingredients: ['Presunto', 'Milho', 'Ervilha', 'Palmito', 'Cebola', 'Ovo', 'Catupiry', 'Mussarela']
  },
  {
    id: 'pizza-pepperoni',
    name: 'Pepperoni',
    description: 'Pepperoni, champignon, cebola, tomate e mussarela',
    price: { broto: 69.99, grande: 76.99 },
    category: 'pizzas-premium',
    isPopular: true,
    ingredients: ['Pepperoni', 'Champignon', 'Cebola', 'Tomate', 'Mussarela']
  },
  {
    id: 'pizza-primavera-catupiry',
    name: 'Primavera com Catupiry',
    description: 'Lombo, milho, palmito, cebola, catupiry à escolha dallora ou scala e mussarela',
    price: { broto: 69.99, grande: 81.99 },
    category: 'pizzas-premium',
    ingredients: ['Lombo', 'Milho', 'Palmito', 'Cebola', 'Catupiry', 'Mussarela']
  },

  // PIZZAS ESPECIAIS
  {
    id: 'pizza-carne-seca',
    name: 'Carne Seca',
    description: 'Carne seca desfiada, cebola, tomate e mussarela',
    price: { broto: 55.99, grande: 73.99 },
    category: 'pizzas-especiais',
    ingredients: ['Carne seca desfiada', 'Cebola', 'Tomate', 'Mussarela']
  },
  {
    id: 'pizza-carne-seca-catupiry',
    name: 'Carne Seca com Catupiry',
    description: 'Carne seca desfiada, cebola, catupiry scala, tomate e mussarela',
    price: { broto: 60.99, grande: 82.99 },
    category: 'pizzas-especiais',
    ingredients: ['Carne seca desfiada', 'Cebola', 'Catupiry scala', 'Tomate', 'Mussarela']
  },
  {
    id: 'pizza-costela',
    name: 'Costela',
    description: 'Costela desfiada, cebola e mussarela',
    price: { broto: 55.99, grande: 71.99 },
    category: 'pizzas-especiais',
    ingredients: ['Costela desfiada', 'Cebola', 'Mussarela']
  },
  {
    id: 'pizza-costela-catupiry',
    name: 'Costela com Catupiry',
    description: 'Costela desfiada, cebola, catupiry scala, mussarela',
    price: { broto: 60.99, grande: 82.99 },
    category: 'pizzas-especiais',
    ingredients: ['Costela desfiada', 'Cebola', 'Catupiry scala', 'Mussarela']
  },
  {
    id: 'pizza-frango-cream-cheese',
    name: 'Frango com Cream Cheese',
    description: 'Frango desfiado, cream cheese scala, mussarela e bacon',
    price: { broto: 50.99, grande: 68.99 },
    category: 'pizzas-especiais',
    ingredients: ['Frango desfiado', 'Cream cheese scala', 'Mussarela', 'Bacon']
  },
  {
    id: 'pizza-lombo-especial',
    name: 'Lombo Especial',
    description: 'Lombo canadense, cream cheese scala, tomate e mussarela',
    price: { broto: 47.99, grande: 70.99 },
    category: 'pizzas-especiais',
    ingredients: ['Lombo canadense', 'Cream cheese scala', 'Tomate', 'Mussarela']
  },
  {
    id: 'pizza-lombo-cream-cheese',
    name: 'Lombo com Cream Cheese',
    description: 'Lombo canadense, cream cheese scala e bacon',
    price: { broto: 47.99, grande: 70.99 },
    category: 'pizzas-especiais',
    ingredients: ['Lombo canadense', 'Cream cheese scala', 'Bacon']
  },
  {
    id: 'pizza-light',
    name: 'Light',
    description: 'Peito de peru, palmito e mussarela',
    price: { broto: 47.99, grande: 70.99 },
    category: 'pizzas-especiais',
    ingredients: ['Peito de peru', 'Palmito', 'Mussarela']
  },
  {
    id: 'pizza-modesta',
    name: 'Modesta',
    description: 'Peito de peru, cream cheese scala e mussarela',
    price: { broto: 47.99, grande: 70.99 },
    category: 'pizzas-especiais',
    ingredients: ['Peito de peru', 'Cream cheese scala', 'Mussarela']
  },
  {
    id: 'pizza-palmito-especial',
    name: 'Palmito Especial',
    description: 'Palmito, catupiry scala, mussarela e bacon',
    price: { broto: 50.99, grande: 70.99 },
    category: 'pizzas-especiais',
    ingredients: ['Palmito', 'Catupiry scala', 'Mussarela', 'Bacon']
  },
  {
    id: 'pizza-peru',
    name: 'Peru',
    description: 'Peito de peru, tomate e mussarela',
    price: { broto: 43.99, grande: 57.99 },
    category: 'pizzas-especiais',
    ingredients: ['Peito de peru', 'Tomate', 'Mussarela']
  },
  {
    id: 'pizza-sorocabana',
    name: 'Sorocabana',
    description: 'Peito de peru, ovos, palmito, tomate, mussarela e parmesão',
    price: { broto: 50.99, grande: 68.99 },
    category: 'pizzas-especiais',
    ingredients: ['Peito de peru', 'Ovos', 'Palmito', 'Tomate', 'Mussarela', 'Parmesão']
  },
  {
    id: 'pizza-strogonoff-carne',
    name: 'Strogonoff de Carne',
    description: 'Mussarela, champignon, carne picada e batata palha',
    price: { broto: 55.99, grande: 72.99 },
    category: 'pizzas-especiais',
    ingredients: ['Mussarela', 'Champignon', 'Carne picada', 'Batata palha']
  },
  {
    id: 'pizza-strogonoff-frango',
    name: 'Strogonoff de Frango',
    description: 'Mussarela, champignon, frango picado e batata palha',
    price: { broto: 52.99, grande: 69.99 },
    category: 'pizzas-especiais',
    ingredients: ['Mussarela', 'Champignon', 'Frango picado', 'Batata palha']
  },
  {
    id: 'pizza-pernil',
    name: 'Pernil',
    description: 'Mussarela, pernil, cebola e tomate',
    price: { broto: 56.99, grande: 74.99 },
    category: 'pizzas-especiais',
    ingredients: ['Mussarela', 'Pernil', 'Cebola', 'Tomate']
  },
  {
    id: 'pizza-pernil-catupiry',
    name: 'Pernil com Catupiry',
    description: 'Mussarela, pernil, cebola, catupiry scala e tomate',
    price: { broto: 61.99, grande: 84.99 },
    category: 'pizzas-especiais',
    ingredients: ['Mussarela', 'Pernil', 'Cebola', 'Catupiry scala', 'Tomate']
  },
  {
    id: 'pizza-cumpim-barbecue',
    name: 'Cumpim com Barbecue',
    description: 'Mussarela, carne de cupim, cebola, catupiry scala e tomate',
    price: { broto: 62.99, grande: 84.99 },
    category: 'pizzas-especiais',
    ingredients: ['Mussarela', 'Carne de cupim', 'Cebola', 'Catupiry scala', 'Tomate']
  },

  // PIZZAS DOCES
  {
    id: 'pizza-brigadeiro',
    name: 'Brigadeiro',
    description: 'Chocolate preto, granulado e leite condensado',
    price: { broto: 45.99, grande: 58.99 },
    category: 'pizzas-doces',
    ingredients: ['Chocolate preto', 'Granulado', 'Leite condensado']
  },
  {
    id: 'pizza-confete',
    name: 'Confete',
    description: 'Chocolate preto, confete e leite condensado',
    price: { broto: 47.99, grande: 62.99 },
    category: 'pizzas-doces',
    ingredients: ['Chocolate preto', 'Confete', 'Leite condensado']
  },
  {
    id: 'pizza-prestigio',
    name: 'Prestígio',
    description: 'Chocolate preto, coco ralado e leite condensado',
    price: { broto: 44.99, grande: 58.99 },
    category: 'pizzas-doces',
    ingredients: ['Chocolate preto', 'Coco ralado', 'Leite condensado']
  },
  {
    id: 'pizza-romeu-julieta-doce',
    name: 'Romeu e Julieta',
    description: 'Mussarela e goiabada',
    price: { broto: 34.99, grande: 45.99 },
    category: 'pizzas-doces',
    ingredients: ['Mussarela', 'Goiabada']
  },
  {
    id: 'pizza-chocomix',
    name: 'Chocomix',
    description: 'Chocolate preto, chocolate branco e granulado',
    price: { broto: 45.99, grande: 58.99 },
    category: 'pizzas-doces',
    ingredients: ['Chocolate preto', 'Chocolate branco', 'Granulado']
  },
  {
    id: 'pizza-doce-leite',
    name: 'Doce de Leite',
    description: 'Doce de leite e granulado',
    price: { broto: 45.99, grande: 55.99 },
    category: 'pizzas-doces',
    ingredients: ['Doce de leite', 'Granulado']
  },
  {
    id: 'pizza-ovomaltine',
    name: 'Ovomaltine',
    description: 'Chocolate preto, ovomaltine e cereja',
    price: { broto: 45.99, grande: 62.99 },
    category: 'pizzas-doces',
    ingredients: ['Chocolate preto', 'Ovomaltine', 'Cereja']
  },
  {
    id: 'pizza-oreo',
    name: 'Oreo',
    description: 'Creme de avelã, oreo e cereja',
    price: { broto: 48.99, grande: 63.99 },
    category: 'pizzas-doces',
    ingredients: ['Creme de avelã', 'Oreo', 'Cereja']
  },

  // BEBIDAS
  {
    id: 'coca-cola',
    name: 'Coca-Cola',
    description: 'Refrigerante Coca-Cola gelado',
    price: { broto: 16.99, grande: 16.99 },
    category: 'bebidas',
    isPopular: true
  },
  {
    id: 'sprite',
    name: 'Sprite',
    description: 'Refrigerante Sprite gelado',
    price: { broto: 13.99, grande: 13.99 },
    category: 'bebidas'
  },
  {
    id: 'fanta-laranja',
    name: 'Fanta Laranja',
    description: 'Refrigerante Fanta Laranja gelado',
    price: { broto: 13.99, grande: 13.99 },
    category: 'bebidas'
  },
  {
    id: 'fanta-uva',
    name: 'Fanta Uva',
    description: 'Refrigerante Fanta Uva gelado',
    price: { broto: 13.99, grande: 13.99 },
    category: 'bebidas'
  },

  // ADICIONAIS
  {
    id: 'alho-gratinado',
    name: 'Alho Gratinado',
    description: 'Alho gratinado extra',
    price: { broto: 6.99, grande: 6.99 },
    category: 'adicionais'
  },
  {
    id: 'atum-adicional',
    name: 'Atum',
    description: 'Atum extra',
    price: { broto: 13.99, grande: 13.99 },
    category: 'adicionais'
  },
  {
    id: 'bacon-adicional',
    name: 'Bacon',
    description: 'Bacon extra',
    price: { broto: 14.99, grande: 14.99 },
    category: 'adicionais'
  },
  {
    id: 'batata-palha',
    name: 'Batata Palha',
    description: 'Batata palha extra',
    price: { broto: 9.99, grande: 9.99 },
    category: 'adicionais'
  },
  {
    id: 'brocolis-adicional',
    name: 'Brócolis',
    description: 'Brócolis extra',
    price: { broto: 13.99, grande: 13.99 },
    category: 'adicionais'
  },
  {
    id: 'calabresa-adicional',
    name: 'Calabresa',
    description: 'Calabresa extra',
    price: { broto: 13.99, grande: 13.99 },
    category: 'adicionais'
  },
  {
    id: 'catupiry-dallora',
    name: 'Catupiry Dallora',
    description: 'Catupiry Dallora extra',
    price: { broto: 8.99, grande: 8.99 },
    category: 'adicionais'
  },
  {
    id: 'catupiry-scala',
    name: 'Catupiry Scala/Origin',
    description: 'Catupiry Scala ou Origin extra',
    price: { broto: 13.99, grande: 13.99 },
    category: 'adicionais'
  },
  {
    id: 'cebola-adicional',
    name: 'Cebola',
    description: 'Cebola extra',
    price: { broto: 6.99, grande: 6.99 },
    category: 'adicionais'
  },
  {
    id: 'champignon-adicional',
    name: 'Champignon',
    description: 'Champignon extra',
    price: { broto: 10.99, grande: 10.99 },
    category: 'adicionais'
  },
  {
    id: 'cheddar-scala',
    name: 'Cheddar Scala',
    description: 'Cheddar Scala extra',
    price: { broto: 13.99, grande: 13.99 },
    category: 'adicionais'
  },
  {
    id: 'ervilha-adicional',
    name: 'Ervilha',
    description: 'Ervilha extra',
    price: { broto: 6.99, grande: 6.99 },
    category: 'adicionais'
  },
  {
    id: 'frango-adicional',
    name: 'Frango',
    description: 'Frango extra',
    price: { broto: 12.99, grande: 12.99 },
    category: 'adicionais'
  },
  {
    id: 'gorgonzola-adicional',
    name: 'Gorgonzola',
    description: 'Gorgonzola extra',
    price: { broto: 12.99, grande: 12.99 },
    category: 'adicionais'
  },
  {
    id: 'lombo-adicional',
    name: 'Lombo',
    description: 'Lombo extra',
    price: { broto: 12.99, grande: 12.99 },
    category: 'adicionais'
  },
  {
    id: 'milho-adicional',
    name: 'Milho',
    description: 'Milho extra',
    price: { broto: 6.99, grande: 6.99 },
    category: 'adicionais'
  },
  {
    id: 'mussarela-adicional',
    name: 'Mussarela',
    description: 'Mussarela extra',
    price: { broto: 13.99, grande: 13.99 },
    category: 'adicionais'
  },
  {
    id: 'ovo-adicional',
    name: 'Ovo',
    description: 'Ovo extra',
    price: { broto: 8.99, grande: 8.99 },
    category: 'adicionais'
  },
  {
    id: 'palmito-adicional',
    name: 'Palmito',
    description: 'Palmito extra',
    price: { broto: 12.99, grande: 12.99 },
    category: 'adicionais'
  },
  {
    id: 'parmesao-adicional',
    name: 'Parmesão',
    description: 'Parmesão extra',
    price: { broto: 12.99, grande: 12.99 },
    category: 'adicionais'
  },
  {
    id: 'peperoni-adicional',
    name: 'Peperoni',
    description: 'Peperoni extra',
    price: { broto: 14.99, grande: 14.99 },
    category: 'adicionais'
  },
  {
    id: 'pimenta-adicional',
    name: 'Pimenta',
    description: 'Pimenta extra',
    price: { broto: 6.99, grande: 6.99 },
    category: 'adicionais'
  },
  {
    id: 'presunto-adicional',
    name: 'Presunto',
    description: 'Presunto extra',
    price: { broto: 13.99, grande: 13.99 },
    category: 'adicionais'
  },
  {
    id: 'provolone-adicional',
    name: 'Provolone',
    description: 'Provolone extra',
    price: { broto: 9.99, grande: 9.99 },
    category: 'adicionais'
  },

  // BORDAS
  {
    id: 'borda-requeijao',
    name: 'Requeijão',
    description: 'Borda recheada com requeijão',
    price: { broto: 6.99, grande: 6.99 },
    category: 'bordas'
  },
  {
    id: 'borda-cheddar-scala',
    name: 'Cheddar Scala',
    description: 'Borda recheada com cheddar scala',
    price: { broto: 17.99, grande: 17.99 },
    category: 'bordas'
  },
  {
    id: 'borda-mussarela',
    name: 'Mussarela',
    description: 'Borda recheada com mussarela',
    price: { broto: 20.99, grande: 20.99 },
    category: 'bordas'
  },
  {
    id: 'borda-catupiry-scala',
    name: 'Catupiry Scala',
    description: 'Borda recheada com catupiry scala',
    price: { broto: 17.99, grande: 17.99 },
    category: 'bordas'
  },
  {
    id: 'borda-cream-cheese',
    name: 'Cream Cheese',
    description: 'Borda recheada com cream cheese',
    price: { broto: 17.99, grande: 17.99 },
    category: 'bordas'
  },
  {
    id: 'borda-doce-leite',
    name: 'Doce de Leite',
    description: 'Borda recheada com doce de leite',
    price: { broto: 17.99, grande: 17.99 },
    category: 'bordas'
  },
  {
    id: 'borda-chocolate-preto',
    name: 'Chocolate Preto',
    description: 'Borda recheada com chocolate preto',
    price: { broto: 17.99, grande: 17.99 },
    category: 'bordas'
  },
  {
    id: 'borda-chocolate-branco',
    name: 'Chocolate Branco',
    description: 'Borda recheada com chocolate branco',
    price: { broto: 17.99, grande: 17.99 },
    category: 'bordas'
  },
  {
    id: 'borda-goiabada',
    name: 'Goiabada',
    description: 'Borda recheada com goiabada',
    price: { broto: 17.99, grande: 17.99 },
    category: 'bordas'
  }
];

export const getProductsByCategory = (category: 'combos' | 'pizzas-promocionais' | 'pizzas-premium' | 'pizzas-tradicionais' | 'pizzas-especiais' | 'pizzas-doces' | 'bebidas' | 'adicionais' | 'bordas') => {
  return products.filter(product => product.category === category);
};

export const categories = [
  { id: 'combos', name: 'Combos', icon: '🎉' },
  { id: 'pizzas-promocionais', name: 'Pizzas Promocionais', icon: '🔥' },
  { id: 'pizzas-tradicionais', name: 'Pizzas Tradicionais', icon: '🍕' },
  { id: 'pizzas-premium', name: 'Pizzas Premium', icon: '👑' },
  { id: 'pizzas-especiais', name: 'Pizzas Especiais', icon: '⭐' },
  { id: 'pizzas-doces', name: 'Pizzas Doces', icon: '🍫' },
  { id: 'bebidas', name: 'Bebidas', icon: '🥤' },
  { id: 'adicionais', name: 'Adicionais', icon: '➕' },
  { id: 'bordas', name: 'Bordas', icon: '🥨' }
] as const;
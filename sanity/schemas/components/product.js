// In your schema file (e.g., ./schemas/product.js)
export default {
  name: 'product',
  title: 'Produkt',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Preis',
      type: 'string',
    },
  ],
}

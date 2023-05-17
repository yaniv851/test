// schemas/pet.js
export default {
    name: 'paid',
    type: 'document',
    title: 'סרטונים',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'שם הסרטון'
      },
      {
        name: 'pic',
        type: 'file',
        title: 'הסרטון'
      },
      {
        name: 'vidUrl',
        type: 'url',
        title: 'קישור לסרטון (במידה והוא לא קיים במחשב)'
      },
    ]
  }
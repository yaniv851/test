// schemas/pet.js
export default {
    name: 'premium',
    type: 'document',
    title: 'קורס דיגיטלי',
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
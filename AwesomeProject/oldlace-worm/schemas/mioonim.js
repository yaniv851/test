// schemas/pet.js
export default {
    name: 'mioon',
    type: 'document',
      title: 'דף מיונים',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'כותרת העמוד'
      },
      {
        name: 'txt',
        type: 'text',
        title: 'תיאור קצר'
      },
      {
        name: 'banner',
        type: 'url',
        title: 'קישור לתמונת באנר (תמונה גדולה כמו ביוטיוב בכל ערוץ)'
      },
    ]
  }
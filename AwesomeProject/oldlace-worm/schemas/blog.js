// schemas/pet.js
export default {
    name: 'blog',
    type: 'document',
      title: 'בלוג',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'שם הבלוג'
      },
      {
        name: 'txt',
        type: 'text',
        title: 'תיאור הבלוג'
      },
      {
        name: 'insta',
        type: 'url',
        title: 'קישור'
      },
    ]
  }
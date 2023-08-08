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
        name: 'pic',
        type: 'image',
        title: 'תמונת המיזם'
      },
      {
        name: 'insta',
        type: 'url',
        title: 'קישור'
      },
    ]
  }
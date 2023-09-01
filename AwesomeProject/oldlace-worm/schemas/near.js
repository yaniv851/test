// schemas/pet.js
export default {
    name: 'near',
    type: 'document',
      title: 'חממות קרובות',
    fields: [
      {
        name: 'ti',
        type: 'string',
        title: 'שם המיזם'
      },
      {
        name: 'txt',
        type: 'text',
        title: 'תיאור קצר'
      },
      {
        name: 'pict',
        type: 'image',
        title: 'תמונת המיזם'
      },
      {
        name: 'inst',
        type: 'url',
        title: 'קישור לאינסטגרם של המיזם'
      },
      {
        name: 'numb',
        type: 'string',
        title: 'מספר טלפון של הבוגר'
      }
    ]
  }
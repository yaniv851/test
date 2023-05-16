// schemas/pet.js
export default {
    name: 'gale',
    type: 'document',
      title: 'גלריית המיזמים שלנו',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'שם המיזם'
      },
      {
        name: 'pic',
        type: 'image',
        title: 'תמונת המיזם'
      },
      {
        name: 'insta',
        type: 'url',
        title: 'קישור לאינסטגרם של המיזם'
      },
      {
        name: 'num',
        type: 'string',
        title: 'מספר טלפון של הבוגר'
      }
    ]
  }
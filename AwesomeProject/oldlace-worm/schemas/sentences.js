// schemas/pet.js
export default {
    name: 'sent',
    type: 'document',
      title: 'משפטים לדף בית',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'כותרת השאלה'
      },
      {
        name: 'txt',
        type: 'text',
        title: 'טקסט'
      },
    ]
  }
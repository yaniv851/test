// schemas/pet.js
export default {
    name: 'mentor',
    type: 'document',
    title: 'המנטורים שלנו',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'שם המנטור'
        },
        {
            name: 'pic',
            type: 'image',
            title: 'לוגו המנטור'
        },
    ]
}
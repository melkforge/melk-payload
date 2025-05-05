import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const Recipes: CollectionConfig = {
    slug: 'recipes',
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
      },
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true
        },
        {
            name: 'image_path',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'author',
            type: 'text',
            required: true,
        },
        {
            name: 'ingredients',
            type: 'text',
            required: true,
        },
        {
            name: 'instructions',
            type: 'text',
            required: true,
        },
    ]
}
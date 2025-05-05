import { CollectionConfig } from 'payload';

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'sku',
    },
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    fields: [
        {
        name: 'sku',
        type: 'text',
        required: true,
        },
        {
        name: 'product_name',
        type: 'text',
        required: true,
        },
    ],
    };


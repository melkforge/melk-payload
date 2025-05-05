import { anyone } from '@/access/anyone';
import { authenticated } from '@/access/authenticated';
import { CollectionConfig } from 'payload';

export const CollectionA_B_Join: CollectionConfig = {
    slug: 'product_availability',
    admin: {
        useAsTitle: 'id',
    },

    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },

    fields: [
        {
            name: 'location_id',
            label: 'location reference',
            type: 'relationship',
            relationTo: 'locations',
            required: true,
        },
        {
            name: 'product_id',
            label: 'product id reference',
            type: 'relationship',
            relationTo: 'products',
            required: true,
        },
    ],
};
import { CollectionConfig } from 'payload';

export const Locations: CollectionConfig = {
  slug: 'locations', 
  admin: {
    useAsTitle: 'store_name',
  },
  fields: [
    {
      name: 'store_name',
      label: 'Store Name',
      type: 'text',
      required: true,
    },
    {
      name: 'address_line1',
      label: 'Address Line 1',
      type: 'text',
      required: true,
    },
    {
      name: 'address_line2',
      label: 'Address Line 2',
      type: 'text',
      required: false,
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      required: true,
    },
    {
        name: 'province_state',
        label: 'Province/State',
        type: 'text',
        required: true,
    },
    {
        name: 'postal_code',
        label: 'Postal Code',
        type: 'text',
        required: true,
    },
    {
        name: 'country',
        label: 'Country',
        type: 'text',
        required: true,
    },
  ],
};
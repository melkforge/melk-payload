import { CollectionConfig } from 'payload';

export const Locations: CollectionConfig = {
  slug: 'locations', 
  admin: {
    useAsTitle: 'Address_by_ID',
  },
  fields: [
    {
      name: 'Row_Labels',
      label: 'Row Labels',
      type: 'text',
      required: true,
    },
    {
      name: 'FINAL_NAME',
      label: 'FINAL NAME',
      type: 'text',
      required: true,
    },
    {
      name: 'Address_by_ID',
      label: 'Address by ID',
      type: 'text',
      required: false,
    },
    {
      name: 'City_by_ID',
      label: 'City by ID',
      type: 'text',
      required: true,
    },
    {
        name: 'Province',
        label: 'Province**',
        type: 'text',
        required: true,
    },
  ],
};
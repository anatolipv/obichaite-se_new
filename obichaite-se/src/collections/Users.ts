import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    verify: true,
  },
  access: {
    admin: ({ req }) => req.user?.role === 'admin',

    read: ({ req, id }) => {
      if (!req.user) return false
      if (req.user.role === 'admin') return true
      return id ? id === req.user.id : { id: { equals: req.user.id } }
    },
    update: ({ req, id }) => {
      if (!req.user) return false
      if (req.user.role === 'admin') return true
      return id ? id === req.user.id : { id: { equals: req.user.id } }
    },
    delete: ({ req }) => req.user?.role === 'admin',
    create: () => true,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'role',
      type: 'select',
      defaultValue: 'admin',
      access: {
        read: ({ req }) => !!req.user, // logged-in users can see roles
        create: ({ req }) => req.user?.role === 'admin',
        update: ({ req }) => req.user?.role === 'admin',
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
    },
    {
      name: 'firstName',
      type: 'text',
      access: {
        read: () => true,
        update: () => false,
        create: () => false,
      },
      admin: {
        readOnly: true,
        condition: (data) => data.role === 'user',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      access: {
        read: () => true,
        update: () => false,
        create: () => false,
      },
      admin: {
        readOnly: true,
        condition: (data) => data.role === 'user',
      },
    },
    {
      name: 'phoneNumber',
      type: 'number',
      access: {
        read: () => true,
        update: () => false,
        create: () => false,
      },
      admin: {
        readOnly: true,
        condition: (data) => data.role === 'user',
      },
    },
    {
      name: 'dateOfBirth',
      type: 'text',
      access: {
        read: () => true,
        update: () => false,
        create: () => false,
      },
      admin: {
        readOnly: true,
        condition: (data) => data.role === 'user',
      },
    },
  ],
}

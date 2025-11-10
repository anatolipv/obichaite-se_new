import type { CollectionConfig } from 'payload'

const isDev = process.env.NODE_ENV === 'development'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    verify: {
      generateEmailSubject: (_args?: { token?: string; user?: { email?: string } }) =>
        `Верификация на Имейл`,
      generateEmailHTML: ({ token, user }: { token?: string; user?: { email?: string } }) => {
        const t = encodeURIComponent(token ?? '')
        const baseUrl = isDev ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_SERVER_URL || ''
        const url = `${baseUrl}/auth/verify?token=${t}`
        const email = user?.email || ''
        const logoUrl = `${baseUrl}_next/image?url=%2Flogo-full.png&w=1920&q=75`

        return `<!DOCTYPE html>
<html lang="bg">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Верификация на Имейл</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f4;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;border:1px solid #e5e5e5;">
            <!-- Header / Logo -->
            <tr>
              <td align="center" style="padding:24px 24px 8px 24px;">
                <img src="${logoUrl}" alt="Лого" style="max-width:160px;height:auto;display:block;" />
              </td>
            </tr>
            <!-- Greeting -->
            <tr>
              <td align="left" style="padding:8px 24px 0 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:20px;line-height:1.4;color:#111111;font-weight:600;">
                Здравей${email ? `, ${email}` : ''}!
              </td>
            </tr>
            <!-- Intro text -->
            <tr>
              <td align="left" style="padding:12px 24px 0 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#333333;">
                Благодарим ти, че се регистрира. За да активираш своя акаунт и да потвърдиш имейл адреса си, моля натисни бутона по-долу.
              </td>
            </tr>
            <!-- Button -->
            <tr>
              <td align="center" style="padding:24px 24px 16px 24px;">
                <a href="${url}" style="display:inline-block;padding:12px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;background-color:#1d4ed8;border-radius:6px;">
                  Потвърди имейл адреса
                </a>
              </td>
            </tr>
            <!-- Fallback link -->
            <tr>
              <td align="left" style="padding:0 24px 16px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#666666;">
                Ако бутонът не работи, копирай и постави следния линк в своя браузър:<br />
                <a href="${url}" style="color:#1d4ed8;text-decoration:underline;word-break:break-all;">${url}</a>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td align="left" style="padding:16px 24px 24px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;line-height:1.6;color:#999999;border-top:1px solid #f0f0f0;">
                Това съобщение е изпратено автоматично. Ако не си инициирал тази регистрация, просто го игнорирай.
                <br /><br />
                &copy; ${new Date().getFullYear()} Вашата компания. Всички права запазени.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
      },
    },
    forgotPassword: {
      generateEmailSubject: () => `Обновяване на паролата`,
      generateEmailHTML: (args) => {
        const t = encodeURIComponent(args?.token ?? '')
        const url = `${isDev ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_SERVER_URL}/auth/reset-password?token=${t}`
        const baseUrl = isDev ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_SERVER_URL || ''

        const email = args?.user?.email ?? ''
        const logoUrl = `${baseUrl}_next/image?url=%2Flogo-full.png&w=1920&q=75`
        return `<!DOCTYPE html>
<html lang="bg">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Обновяване на паролата</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f4;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;border:1px solid #e5e5e5;">
            <!-- Header / Logo -->
            <tr>
              <td align="center" style="padding:24px 24px 8px 24px;">
                <img src="${logoUrl}" alt="Лого" style="max-width:160px;height:auto;display:block;" />
              </td>
            </tr>
            <!-- Title -->
            <tr>
              <td align="left" style="padding:8px 24px 0 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:20px;line-height:1.4;color:#111111;font-weight:600;">
                Обновяване на паролата
              </td>
            </tr>
            <!-- Greeting & Explanation -->
            <tr>
              <td align="left" style="padding:12px 24px 0 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#333333;">
                Получихме заявка за обновяване на паролата за акаунта${email ? ` с имейл <strong>${email}</strong>` : ''}.
                Ако ти изпрати тази заявка, моля натисни бутона по-долу, за да въведеш нова парола.
              </td>
            </tr>
            <!-- Button -->
            <tr>
              <td align="center" style="padding:24px 24px 16px 24px;">
                <a href="${url}" style="display:inline-block;padding:12px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;background-color:#1d4ed8;border-radius:6px;">
                  Обнови паролата
                </a>
              </td>
            </tr>
            <!-- Fallback link -->
            <tr>
              <td align="left" style="padding:0 24px 16px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#666666;">
                Ако бутонът не работи, копирай и постави следния линк в своя браузър:<br />
                <a href="${url}" style="color:#1d4ed8;text-decoration:underline;word-break:break-all;">${url}</a>
              </td>
            </tr>
            <!-- Security note -->
            <tr>
              <td align="left" style="padding:0 24px 16px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;line-height:1.6;color:#999999;">
                Ако не си заявявал обновяване на парола, игнорирай този имейл. Паролата ти ще остане непроменена.
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td align="left" style="padding:16px 24px 24px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;line-height:1.6;color:#999999;border-top:1px solid #f0f0f0;">
                Това съобщение е изпратено автоматично. Моля, не отговаряй на този имейл.
                <br /><br />
                &copy; ${new Date().getFullYear()} Вашата компания. Всички права запазени.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
      },
    },
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
    {
      name: 'shoppingCartProducts',
      type: 'relationship',
      relationTo: 'product',
      hasMany: true,
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

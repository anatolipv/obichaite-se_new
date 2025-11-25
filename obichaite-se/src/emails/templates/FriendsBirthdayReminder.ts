const getBaseUrl = () => process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const getLogoUrl = () => `${getBaseUrl()}_next/image?url=%2Flogo-full.png&w=1920&q=75`

export const FriendBirthday = {
  subject: ({ friendName }: { friendName: string }) => `Празника на ${friendName}!`,
  html: ({ friendName }: { friendName: string }) => {
    const logoUrl = getLogoUrl()

    return `<!DOCTYPE html>
<html lang="bg">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Празника на ${friendName}, чука на вратата!</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f4;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;border:1px solid #e5e5e5;">
            <tr>
              <td align="center" style="padding:24px 24px 8px 24px;">
                <img src="${logoUrl}" alt="Лого" style="max-width:160px;height:auto;display:block;" />
              </td>
            </tr>
            <tr>
              <td align="left" style="padding:8px 24px 0 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:20px;line-height:1.4;color:#111111;font-weight:600;">
                Празника на ${friendName}, приближава зарадвайте ближния с подарък от нас
              </td>
            </tr>
            <tr>
            <td style="padding:0 24px 24px 24px; font-family:Arial, sans-serif; color:#111111;">
              <h1 style="margin:0 0 12px 0; font-size:22px; line-height:1.4; font-weight:bold; text-align:left;">
                Ето и нашите категории с подаръци за вас! ❤❤❤
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 24px 24px 24px; font-family:Arial, sans-serif; font-size:12px; line-height:1.6; color:#555555; border-top:1px solid #eeeeee;">
              <p style="margin:6px 0;">
                <a href="https://obichaite-se.com/kategorii/produkti" style="color:#555555; text-decoration:underline;">
                  Продукти
                </a>
              </p>

              <p style="margin:6px 0;">
                <a href="https://obichaite-se.com/kategorii/emotsionalni-iznenadi" style="color:#555555; text-decoration:underline;">
                  Емоционални изненади
                </a>
              </p>

              <p style="margin:6px 0;">
                <a href="https://obichaite-se.com/kategorii/tematichni-podarytsi" style="color:#555555; text-decoration:underline;">
                  Тематични подаръци
                </a>
              </p>

              <p style="margin:6px 0;">
                <a href="https://obichaite-se.com/kategorii/rychnoizraboteni-podarytsi" style="color:#555555; text-decoration:underline;">
                  Ръчноизработени подаръци
                </a>
              </p>

              <p style="margin:6px 0;">
                <a href="https://obichaite-se.com/kategorii/ekstremni-prezhivyavaniya" style="color:#555555; text-decoration:underline;">
                  Екстремни преживявания
                </a>
              </p>

              <p style="margin:6px 0;">
                <a href="https://obichaite-se.com/kategorii/organizirane-na-sybitiya" style="color:#555555; text-decoration:underline;">
                  Организирани на събития
                </a>
              </p>
            </td>
          </tr>
            
            <tr>
            <td style="padding:16px 24px 24px 24px; font-family:Arial, sans-serif; font-size:12px; line-height:1.6; color:#555555; border-top:1px solid #eeeeee;">
              <p style="margin:0 0 6px 0;">
                ✉ <a href="mailto:office@obichaite-se.com" style="color:#555555; text-decoration:none;">office@obichaite-se.com</a><br />
                🕿 <a href="tel:+359879003588" style="color:#555555; text-decoration:none;">+359 879 003 588</a><br />
                🌐 <a href="https://obichaite-se.com" style="color:#555555; text-decoration:none;">https://obichaite-se.com</a>
              </p>

              <p style="margin:10px 0 0 0; font-style:italic;">
                С обич и внимание към всеки детайл – екипът на Obichaite-se.
              </p>
            </td>
          </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
  },
}

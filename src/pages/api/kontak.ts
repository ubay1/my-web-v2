import type { APIRoute } from 'astro'
import nodemailer from 'nodemailer'

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      hallo: 'world',
    }),
  )
}
export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData()
  const name = data.get('name')
  const email = data.get('email')
  const pesan = data.get('pesan')

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ubay00804@gmail.com',
      pass: 'fnrqauayhggwehlm',
    },
  })

  // const emailHtml = render(<TemplateEmail userFirstname={name} msg={pesan} />)

  const options: any = {
    from: email,
    to: 'ubay00804@gmail.com',
    subject: `INFO LOKER/FREELANCE DARI ${name} - ${email}`,
    text: pesan,
    // html: emailHtml,
  }

  const send = await transporter.sendMail(options)
  return new Response(
    JSON.stringify({
      message: 'Pesan terkirim!',
    }),
    { status: 200 },
  )
}

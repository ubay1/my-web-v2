import type { RequestHandler } from './$types';
import { createTransport, type Transporter } from 'nodemailer';

let transport: Transporter;

export const POST: RequestHandler = async (event) => {
	const data: { email: string; fullname: string; content: string } = await event.request.json();

	if (!transport) {
		transport = createTransport({
			// host: 'smtp.gmail.com',
			// port: 587,
			// secure: false,
			service: 'gmail',
			auth: {
				user: 'ubay00804@gmail.com',
				pass: 'fnrqauayhggwehlm'
			}
		});
	}

	const worked = await transport.sendMail({
		from: data.email,
		to: 'ubay00804@gmail.com',
		subject: `INFO LOKER/FREELANCE DARI ${data.fullname.toUpperCase()} - ${data.email}`,
		text: data.content
		// html: data.content
	});

	return new Response(worked.response);
};

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nama, email, dan pesan wajib diisi." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const htmlTemplate = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #10b981 0%, #0d9488 100%); padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
          <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Pesan Baru dari Portfolio</h2>
        </div>
        <div style="padding: 24px; color: #333333; line-height: 1.6;">
          <p style="margin-top: 0;">Anda menerima pesan baru melalui Formulir Kontak Portfolio.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; width: 130px; color: #555555;">Nama Pengirim:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #111827;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #555555;">Email Pengirim:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #111827;"><a href="mailto:${email}" style="color: #10b981; text-decoration: none;">${email}</a></td>
            </tr>
          </table>

          <div style="margin-top: 24px;">
            <p style="font-weight: bold; color: #555555; margin-bottom: 8px;">Isi Pesan:</p>
            <div style="background-color: #f9fafb; padding: 16px; border-left: 4px solid #10b981; border-radius: 4px; color: #1f2937; white-space: pre-wrap;">${message}</div>
          </div>

          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eeeeee; font-size: 12px; color: #888888; text-align: center;">
            <p style="margin: 0;">Email ini dikirim secara otomatis melalui sistem formulir kontak portfolio Anda.</p>
            <p style="margin: 4px 0 0 0;">Anda dapat membalas email ini secara langsung untuk merespons <strong>${name}</strong>.</p>
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: "uusamahhhh@gmail.com",
      replyTo: email,
      subject: `[Portfolio Contact] Pesan Baru dari ${name}`,
      text: `Nama: ${name}\nEmail: ${email}\nPesan:\n${message}`,
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Pesan berhasil terkirim!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Nodemailer Error:", error);
    return NextResponse.json(
      { error: "Gagal mengirim email. Silakan periksa kredensial SMTP." },
      { status: 500 }
    );
  }
}

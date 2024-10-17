export function contact_mail_template(name: string, email: string, subject: string | undefined, message: string) {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; max-width: 600px; margin: auto; color: #333;">
      <h2 style="color: #0056b3;">Contact Email</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #0056b3; text-decoration: none;">${email}</a></p>
      ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
      <div style="margin-top: 20px; padding: 10px; background-color: #f9f9f9; border: 1px solid #eee;">
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>
    </div>
  `;
}

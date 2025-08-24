import asyncHandler from 'express-async-handler';
import Newsletter from '../models/Newsletter.js';
import nodemailer from 'nodemailer';

// Subscribe to Newsletter
const subscribeNewsletter = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error('البريد الإلكتروني مطلوب');
  }
  const existing = await Newsletter.findOne({ email });
  if (existing) {
    res.status(400);
    throw new Error('البريد الإلكتروني مسجل مسبقًا');
  }
  const subscription = await Newsletter.create({ email });
  res.status(201).json({ message: 'تم الاشتراك في النشرة الإخبارية', subscription });
});

// Get All Subscribers (Admin only)
const getSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
  res.json(subscribers);
});

// Delete Subscriber (Admin only)
const deleteSubscriber = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subscriber = await Newsletter.findById(id);

  if (!subscriber) {
    res.status(404);
    throw new Error('المشترك غير موجود');
  }

  await subscriber.deleteOne();
  res.json({ message: 'تم حذف المشترك بنجاح' });
});

// Send Newsletter (Admin only)
const sendNewsletter = asyncHandler(async (req, res) => {
  const { emails, subject, message, isHtml } = req.body;
  if (!emails || !subject || !message) {
    res.status(400);
    throw new Error('جميع الحقول (البريد، الموضوع، الرسالة) مطلوبة');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your SMTP service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Amiri', serif; background-color: #f4f4f4; color: #333; direction: rtl; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
        .header { text-align: center; padding: 20px; background-color: #1a4d2e; color: #ffffff; border-radius: 10px 10px 0 0; }
        .header img { max-width: 150px; }
        .content { padding: 20px; }
        .content h2 { color: #1a4d2e; }
        .content p { line-height: 1.6; }
        .footer { text-align: center; padding: 10px; font-size: 12px; color: #777; }
        .footer a { color: #1a4d2e; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://res.cloudinary.com/dtwa3lxdk/image/upload/v1756062090/470950075_1140787384288973_5922062471597926328_n_pxylcf.png" alt="مسجد الإمام مالك">
          <h1>نشرة مسجد الإمام مالك</h1>
        </div>
        <div class="content">
          <h2>${subject}</h2>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
        <div class="footer">
          <p>مسجد الإمام مالك | الإقامة الجامعية بوراوي عمار</p>
          <p><a href="https://www.instagram.com/bouraouimasjid/">تابعنا على إنستغرام</a> | <a href="https://www.facebook.com/share/16rNYKAoxq/">فيسبوك</a></p>
          <p>إلغاء الاشتراك: تواصلوا معنا عبر <a href="mailto:mosqueebouraoui@gmail.com">mosqueebouraoui@gmail.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"مسجد الإمام مالك" <${process.env.EMAIL_USER}>`,
    subject,
    [isHtml ? 'html' : 'text']: isHtml ? htmlTemplate : message,
  };

  const results = await Promise.all(
    emails.map(async (email) => {
      try {
        await transporter.sendMail({ ...mailOptions, to: email });
        return { email, status: 'success' };
      } catch (error) {
        return { email, status: 'failed', error: error.message };
      }
    })
  );

  const failed = results.filter((r) => r.status === 'failed');
  if (failed.length > 0) {
    res.status(207).json({
      message: 'تم إرسال بعض الرسائل مع أخطاء',
      results,
    });
  } else {
    res.json({ message: 'تم إرسال النشرة بنجاح إلى جميع المشتركين', results });
  }
});

export { subscribeNewsletter, getSubscribers, deleteSubscriber, sendNewsletter };
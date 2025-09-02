import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER || "your-email@gmail.com",
        pass: process.env.EMAIL_PASS || "your-app-password"
    }
});

export const sendResetPasswordEmail = async (email, resetToken) => {
    const resetLink = `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
        from: process.env.EMAIL_USER || "your-email@gmail.com",
        to: email,
        subject: "إعادة تعيين كلمة المرور",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333; text-align: center;">إعادة تعيين كلمة المرور</h2>
                <p style="color: #666; font-size: 16px;">مرحباً،</p>
                <p style="color: #666; font-size: 16px;">لقد تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بك.</p>
                <p style="color: #666; font-size: 16px;">إذا لم تقم بهذا الطلب، يمكنك تجاهل هذا الإيميل.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetLink}" 
                       style="background-color: #007bff; color: white; padding: 12px 30px; 
                              text-decoration: none; border-radius: 5px; font-size: 16px;">
                        إعادة تعيين كلمة المرور
                    </a>
                </div>
                <p style="color: #666; font-size: 14px;">أو يمكنك نسخ الرابط التالي:</p>
                <p style="color: #007bff; font-size: 14px; word-break: break-all;">${resetLink}</p>
                <p style="color: #666; font-size: 14px;">هذا الرابط صالح لمدة ساعة واحدة فقط.</p>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px; text-align: center;">
                    إذا واجهت أي مشكلة، يرجى التواصل مع فريق الدعم
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

export const sendWelcomeEmail = async (email, name) => {
    const mailOptions = {
        from: process.env.EMAIL_USER || "your-email@gmail.com",
        to: email,
        subject: "مرحباً بك في نظامنا",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333; text-align: center;">مرحباً بك ${name}!</h2>
                <p style="color: #666; font-size: 16px;">شكراً لك على الانضمام إلى نظامنا.</p>
                <p style="color: #666; font-size: 16px;">يمكنك الآن تسجيل الدخول باستخدام بريدك الإلكتروني.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.FRONTEND_URL || "http://localhost:3000"}/login" 
                       style="background-color: #28a745; color: white; padding: 12px 30px; 
                              text-decoration: none; border-radius: 5px; font-size: 16px;">
                        تسجيل الدخول
                    </a>
                </div>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px; text-align: center;">
                    إذا كان لديك أي استفسار، لا تتردد في التواصل معنا
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

export const sendPasswordChangedEmail = async (email, name) => {
    const mailOptions = {
        from: process.env.EMAIL_USER || "your-email@gmail.com",
        to: email,
        subject: "تم تغيير كلمة المرور",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333; text-align: center;">تم تغيير كلمة المرور</h2>
                <p style="color: #666; font-size: 16px;">مرحباً ${name}،</p>
                <p style="color: #666; font-size: 16px;">تم تغيير كلمة المرور الخاصة بحسابك بنجاح.</p>
                <p style="color: #666; font-size: 16px;">إذا لم تقم بهذا التغيير، يرجى التواصل معنا فوراً.</p>
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <p style="color: #666; font-size: 14px; margin: 0;">
                        <strong>ملاحظة:</strong> تأكد من حفظ كلمة المرور الجديدة في مكان آمن.
                    </p>
                </div>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px; text-align: center;">
                    شكراً لك على استخدام نظامنا
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

package com.easyrent.backend.util;

import com.easyrent.backend.entity.User;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String fromAddress;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendWelcomeEmail(User user) {
        String html = """
                <!DOCTYPE html>
                <html>
                <body style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:linear-gradient(135deg,#667eea 0%%,#764ba2 100%%);padding:20px;">
                  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.2);">
                    <div style="background:linear-gradient(135deg,#667eea 0%%,#764ba2 100%%);padding:40px 20px;text-align:center;color:#fff;">
                      <h1>Welcome to EasyRent!</h1>
                    </div>
                    <div style="padding:30px;color:#333;">
                      <p>Hi %s,</p>
                      <p>Thanks for signing up on EasyRent. Your account has been created successfully and you're all set to start finding or listing rooms.</p>
                      <p style="margin-top:20px;">— The EasyRent Team</p>
                    </div>
                  </div>
                </body>
                </html>
                """.formatted(escape(user.getName()));

        send(user.getEmail(), "Welcome to EasyRent \uD83C\uDFE0", html);
    }

    @Async
    public void sendPasswordResetEmail(User user, String resetToken) {
        String resetUrl = frontendUrl + "/reset/" + resetToken;
        String html = """
                <!DOCTYPE html>
                <html>
                <body style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:linear-gradient(135deg,#f093fb 0%%,#f5576c 100%%);padding:20px;">
                  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.2);">
                    <div style="background:linear-gradient(135deg,#f093fb 0%%,#f5576c 100%%);padding:40px 20px;text-align:center;color:#fff;">
                      <h1>Reset Your Password</h1>
                    </div>
                    <div style="padding:30px;color:#333;">
                      <p>Hi %s,</p>
                      <p>We received a request to reset your EasyRent password. Click the button below to choose a new one. This link expires in 10 minutes.</p>
                      <p style="text-align:center;margin:30px 0;">
                        <a href="%s" style="background:#f5576c;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;display:inline-block;">Reset My Password</a>
                      </p>
                      <p>If the button doesn't work, copy and paste this link into your browser:</p>
                      <p style="word-break:break-all;color:#555;">%s</p>
                      <p>If you didn't request this, you can safely ignore this email.</p>
                    </div>
                  </div>
                </body>
                </html>
                """.formatted(escape(user.getName()), resetUrl, resetUrl);

        send(user.getEmail(), "Reset Your Password - EasyRent \uD83D\uDD10", html);
    }

    private void send(String to, String subject, String html) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(fromAddress);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(html, true);
            mailSender.send(message);
        } catch (Exception e) {
            log.error("Failed to send email to {}: {}", to, e.getMessage());
        }
    }

    private String escape(String value) {
        return value == null ? "" : value.replace("<", "&lt;").replace(">", "&gt;");
    }
}

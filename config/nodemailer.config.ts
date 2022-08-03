// eslint-disable-next-line import/extensions
import 'dotenv/config';

export default () => ({
  email: {
    transport: `smtps://${process.env.EMAIL_AUTH_EMAIL}:${process.env.EMAIL_AUTH_PASSWORD}@${process.env.EMAIL_HOST}`,
    defaults: {
      from: `"${process.env.EMAIL_FROM_USER_NAME}" <${process.env.EMAIL_AUTH_EMAIL}>`,
    },
  },
});

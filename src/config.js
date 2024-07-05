import * as url from "url";

const config = {
  PORT: 8080,
  SERVER: "Local",
  DIRNAME: url.fileURLToPath(new URL(".", import.meta.url)),
  get UPLOAD_DIR() {
    return `${this.DIRNAME}/public/img`;
  },
  MONGODB_URI:
    "mongodb+srv://danns1125:E-commerce@e-commerce-coder.ksbwadq.mongodb.net/ecommerce",
  MONGODB_ID_REGEX: /^[a-fA-F0-9]{24}$/,
  SECRET: "e-commerce_Mdb_1ld0sd[",
  GITHUB_CLIENT_SECRET: '59ee4df3e66e9f95c608086e7c74e091db0a84ca',
  GITHUB_CLIENT_ID: 'Iv23lirfI6qp3cYBKkMg',
  GITHUB_CALLBACK_URL:'http://localhost:8080/api/sessions/ghlogincallback'
};

export default config;

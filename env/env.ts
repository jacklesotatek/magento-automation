import dotenv from "dotenv";

dotenv.config({
  override: true,
  path: process.env.ENV ? `env/.env.${process.env.ENV}` : `env/.env.local`,
});

export class Env {
  static get BASE_URL(): string {
    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
      throw new Error("Environment variable BASE_URL must be set");
    }
    return baseUrl;
  }
}

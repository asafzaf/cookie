import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: config.name || "default-name",
  slug: config.slug || "default-slug",
  version: config.version || "1.0.0",
  extra: {
    apiUrl: process.env.API_URL,
    fireBaseApiKey: process.env.FIREBASE_API_KEY,
  }
});
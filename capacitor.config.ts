
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.laburoya.app',
  appName: 'LaburoYA',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    hostname: 'app.laburoya.com'
  }
};

export default config;

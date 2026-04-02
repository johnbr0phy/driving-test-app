import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.tigertest.app',
  appName: 'TigerTest',
  webDir: 'out',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      autoHide: true,
      launchShowDuration: 1000,
    },
  },
};

export default config;

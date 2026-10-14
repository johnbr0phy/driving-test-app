import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir:'./tests/accessibility', testMatch:'*.spec.ts', fullyParallel:false, workers:1,
 timeout:60000, expect:{timeout:10000}, reporter:[['list'],['json',{outputFile:'test-results/accessibility.json'}]],
 use:{baseURL:'http://127.0.0.1:3100',headless:true,launchOptions:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE}:{},trace:'retain-on-failure'},
 webServer:{command:'npm run dev -- --hostname 127.0.0.1 --port 3100',url:'http://127.0.0.1:3100',reuseExistingServer:!process.env.CI,timeout:120000},
});

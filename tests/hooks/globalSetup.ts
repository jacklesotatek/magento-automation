import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig): Promise<void> {
  const browser = await chromium.launch();
  await browser.newContext();
}

export default globalSetup;

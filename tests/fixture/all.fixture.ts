import { PageFixtureType, pageFixture } from "@fixture/page.fixture";
import { test as baseTest } from "@playwright/test";

const test = baseTest.extend<PageFixtureType>({
  ...pageFixture,
});

export default test;
export const { expect } = test;

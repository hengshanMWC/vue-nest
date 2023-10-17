export interface TestDataApi {
  testName: string;
  describe?: string;
}

export type TestDataKeyList = keyof TestDataApi;

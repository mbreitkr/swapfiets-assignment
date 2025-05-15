import { TestRequest } from "@angular/common/http/testing";

export function expectStaticBikeSearchParams(request: TestRequest): void {
  expect(request.request.params.get("stolenness")).toBe("proximity");
  expect(request.request.params.get("distance")).toBe("15");
}

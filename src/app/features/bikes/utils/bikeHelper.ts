export function replaceEmptyBikeDetails(
  str: string | null | undefined,
): string {
  if (str === "") {
    return "N/A";
  } else {
    return str ?? "Unknown";
  }
}

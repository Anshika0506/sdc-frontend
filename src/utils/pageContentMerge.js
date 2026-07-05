import { DEFAULT_PAGE_CONTENT } from "../constants/defaultPageContent";

const isPlainObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

export const mergePageContent = (base, overrides) => {
  if (!overrides || typeof overrides !== "object") {
    return structuredClone(base);
  }

  const merged = structuredClone(base);

  Object.keys(overrides).forEach((key) => {
    const overrideValue = overrides[key];
    const baseValue = merged[key];

    if (Array.isArray(overrideValue)) {
      merged[key] = structuredClone(overrideValue);
      return;
    }

    if (isPlainObject(overrideValue) && isPlainObject(baseValue)) {
      merged[key] = mergePageContent(baseValue, overrideValue);
      return;
    }

    if (overrideValue !== undefined) {
      merged[key] = overrideValue;
    }
  });

  return merged;
};

export const getMergedPageContent = (overrides) =>
  mergePageContent(DEFAULT_PAGE_CONTENT, overrides);

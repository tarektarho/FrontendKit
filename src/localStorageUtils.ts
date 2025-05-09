export type FailureCallback = () => void;

/**
 * Safely retrieves and parses data (JSON, string, or boolean) from localStorage.
 * If the data is invalid or cannot be parsed as JSON, it invokes the failure callback.
 *
 * @param key - The key to retrieve the data from localStorage.
 * @param failureCallback - A callback function to handle the error (e.g., logging out).
 * @returns The parsed data from localStorage (JSON, string, or boolean) or null if invalid.
 */
export const safeGetItem = <T>(
  key: string,
  failureCallback?: FailureCallback,
): T | string | boolean | null => {
  try {
    const serializedData = localStorage.getItem(key);

    if (serializedData === null) {
      // No data found for the key
      return null;
    }

    // Check if it's a boolean stored as a string
    if (serializedData === "true" || serializedData === "false") {
      return serializedData === "true";
    }

    // Try parsing as JSON, but if it fails, assume it's a plain string
    try {
      const parsedData = JSON.parse(serializedData);

      // If parsed data is undefined or null, throw an error
      if (parsedData === undefined || parsedData === null) {
        throw new Error(`Invalid JSON for key "${key}".`);
      }

      return parsedData as T;
    } catch {
      // Data is not valid JSON, return as plain string
      if (failureCallback) {
        failureCallback();
      }
      return serializedData;
    }
  } catch (error) {
    console.error(
      `Failed to retrieve or parse data from localStorage for key "${key}":`,
      error,
    );

    // Clear the invalid data from localStorage
    localStorage.removeItem(key);

    // Invoke the failure callback (e.g., logout) if provided
    try {
      if (typeof failureCallback === "function") {
        failureCallback();
      }
    } catch (callbackError) {
      console.error("Error executing the failure callback:", callbackError);
    }

    return null;
  }
};
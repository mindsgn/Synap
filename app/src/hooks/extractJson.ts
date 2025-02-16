const extractJsonData = (text: string) => {
  // Find the index of the opening and closing curly braces
  const startIndex = text.indexOf("{");
  const endIndex = text.lastIndexOf("}");

  // Check if both braces are found
  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    // Extract the JSON string
    const jsonString = text.substring(startIndex, endIndex + 1);

    try {
      // Parse the JSON string
      const jsonData = JSON.parse(jsonString);
      return jsonData;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  } else {
    console.error("Valid JSON structure not found in the string");
    return null;
  }
};

export { extractJsonData };

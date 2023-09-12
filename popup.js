document.getElementById('checkWebsite').addEventListener('click', function() {
  // Get the current tab
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const currentTab = tabs[0];

    // Code to check the current website for typosquatting or other threats
    const websiteUrl = currentTab.url;

    // Check if the website URL contains common typosquatting patterns
    if (containsTyposquattingPatterns(websiteUrl)) {
      // Display a red warning message in the popup
      document.body.style.backgroundColor = 'red';
      document.body.innerHTML = '<h1>Stop! This website may be malicious (typosquatting).</h1>';
    } else {
      // Display a green safe message in the popup
      document.body.style.backgroundColor = 'green';
      document.body.innerHTML = '<h1>This website appears to be safe.</h1>';
    }
  });
});

// Function to check if the website URL contains typosquatting patterns
function containsTyposquattingPatterns(websiteUrl) {
  // List of common typosquatting patterns for less tech-savvy users
  const commonPatterns = [
    // Replace common letters with visually similar characters
    { pattern: '0', replacement: 'o' }, // Zero (0) for 'o'
    { pattern: '1', replacement: 'l' }, // One (1) for 'l'
    { pattern: '3', replacement: 'e' }, // Three (3) for 'e'
    { pattern: '4', replacement: 'a' }, // Four (4) for 'a'
    { pattern: '5', replacement: 's' }, // Five (5) for 's'
    { pattern: '7', replacement: 't' }, // Seven (7) for 't',
    
    // Common typos or omitted letters
    { pattern: 'ww', replacement: 'www' }, // Missing 'w's in 'www'
    { pattern: 'htt', replacement: 'http' }, // Missing 'p' in 'http'
    
    // Common misspellings
    { pattern: 'gogle', replacement: 'google' },
    { pattern: 'facbook', replacement: 'facebook' },
    { pattern: 'twiter', replacement: 'twitter' },
    /* will add more common patterns here */
    
    // Common domain variations
    { pattern: 'com.', replacement: 'com' }, // Remove trailing dot
    { pattern: '.com', replacement: 'com' }, // Remove leading dot
  ];

  // Convert the URL to lowercase for case-insensitive comparison
  const lowercaseUrl = websiteUrl.toLowerCase();

  // Check if the URL contains any of the common typosquatting patterns
  for (const { pattern, replacement } of commonPatterns) {
    if (lowercaseUrl.includes(pattern)) {
      // Replace the pattern with the correct version for user-friendly feedback
      const friendlyUrl = lowercaseUrl.replace(pattern, replacement);

      // Return the friendly URL as a potential typosquatting match
      return friendlyUrl;
    }
  }

  // If no typosquatting patterns are detected, return false
  return false;
}
function doGet() {
  const template = HtmlService.createTemplateFromFile('index');
  return template
    .evaluate()
    .setTitle('IDD Advocacy Web App')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Helper to include other files as templated HTML (CSS/JS) within index.html.
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

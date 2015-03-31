import jsdom from "jsdom";

global.document = jsdom.jsdom("<!DOCTYPE html><html><body></body></html>");
global.navigator = { userAgent: "node.js" };
global.window = document.parentWindow;

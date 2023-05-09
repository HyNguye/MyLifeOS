export function handleExtension(app) {
    switch (app.type.displayName) {
      case "New Text":
        return ".txt";
  
      default:
        return ".exe";
    }
  } 
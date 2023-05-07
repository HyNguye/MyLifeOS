export function handleExtension(app) {
    switch (app.type.name) {
      case "NewText":
        return ".txt";
  
      default:
        return ".exe";
    }
  } 
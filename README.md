# Notes-App

Dieses Projekt ist eine Notizen-App, die mit React Native und Expo entwickelt wurde. Die App ermöglicht es Benutzern, Notizen zu erstellen, anzuzeigen, zu bearbeiten und zu löschen. Die Notizen werden in der Cloud auf Firebase gespeichert, was eine einfache Synchronisation und Speicherung der Daten ermöglicht.

### Hauptfunktionen
Notizen erstellen und verwalten: Benutzer können neue Notizen erstellen, bestehende Notizen anzeigen, bearbeiten und löschen.
- Firebase-Integration: Die App verwendet Firebase, um Notizen in der Cloud zu speichern und abzurufen. 🧑‍🚒🔥
- Einstellungen: Eine Einstellungen-Seite, auf der Benutzer Informationen über die App, den Entwickler und die verwendeten Frameworks und Tools finden können. 🧰
- Bildanzeige: Eine Komponente zur Anzeige von Bildern mit Optionen zum Drehen und Löschen der Bilder. 🖼️


### Verwendete Technologien
- React Native: Für die Entwicklung der mobilen App.
- Expo: Für die einfache Einrichtung und Verwaltung des Projekts.
- Firebase: Für die Speicherung und Synchronisation der Notizen in der Cloud.
- Native Base: Für die UI-Komponenten und Stile.
- TypeScript: Für die Typensicherheit und bessere Codequalität.


### Info
Die App dient zu schulischen Zwecken und bietet keinen grossen Nutzen zur Speicherung von Notizen

- Version: 0.1.0
- Entwickler: Noah Nikollbibaj
- Datum: 30.12.2024

![showcaseOptimized](https://github.com/user-attachments/assets/e14cb4d5-6cd8-4c37-9c4d-a090d4a9db37)


## Installation (nur Android)
Um die App auf dem Android zu installieren und testen wird der bundletool benötigt, um die Applikation zu erstellen und installieren!
- Bundletool: https://github.com/google/bundletool/releases

Unter dem Ordner output befinden sich einige Dateien die zur Installation benötigt werden. Um die App zu installieren wird folgender Befehl im Git Bash (oder Powershell) eingegeben
```
java -jar bundletool.jar build-apks \
  --bundle=notes.aab \
  --output=notizenapp.apks \
  --ks=@niko1512__notes-app.jks \
  --ks-key-alias=11337d2e437c4c1da34213126878a5a4 \
  --ks-pass=pass:c9fbf5d16bffc0a231eb5391ff946062 \
  --key-pass=pass:4801db00bff999da9ba36dd53f8a1d72
```

Sollte dies nicht funktionieren dann wird empfohlen Andorid SDK Tool herunterzuladen und diese auf dem Computer unter Systemvariablen "Path" einzutragen! 
- SDK Tools: https://developer.android.com/tools/releases/platform-tools?hl=de

Weitere Informationen zur Installation befinden sich auf Andorid Developer
- Android Developer: https://developer.android.com/tools/bundletool?hl=de

 


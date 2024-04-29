# F# Settings on VSCode

If you are new to F# and using [VSCode](https://code.visualstudio.com/) , Create a new Profile.

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1714364045993.png)

This project includes a `.vscode/extensions.json`  file that recommends installing the following extensions:

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1714363435870.png)

---

**Settings**  in the newly created profile can be as below:

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1714364148941.png)

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1714364195266.png)

**setting.json**

```json
{
    "files.autoSave": "afterDelay",
    "files.autoSaveDelay": 500,
    "files.trimTrailingWhitespace": true,
    "workbench.startupEditor": "none",
    "workbench.colorTheme": "One Monokai",
    "workbench.colorCustomizations": {
        "terminal.background":"#002b36"
    },
    "terminal.integrated.fontFamily": "MesloLGS NF",
    "terminal.integrated.cursorBlinking": true,
    "terminal.integrated.cursorStyle": "line",
    "terminal.integrated.minimumContrastRatio": 1,
    "terminal.integrated.profiles.linux": {
        "zsh": {
            "path": "/usr/bin/zsh",
            "args": []
        }
    },
    "terminal.integrated.defaultProfile.linux": "zsh",
    "terminal.integrated.env.linux": {
            "$SHELL":"/usr/bin/zsh"
      },
    "editor.fontSize": 16,
    "editor.codeLensFontSize": 16,
    "editor.codeLensFontFamily":
    "'Droid Sans Mono', 'monospace', monospace",
 
 
    "FSharp.lineLens.enabled": "always",
    "FSharp.inlayHints.parameterNames": false,
    "FSharp.inlayHints.typeAnnotations": false,
    "FSharp.codeLenses.references.enabled": false,
    "FSharp.fsac.parallelReferenceResolution": true,
    "FSharp.showExplorerOnStartup": false,
    "FSharp.showProjectExplorerIn": "explorer"
 }
 
```
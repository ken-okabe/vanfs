import "./custom.css"

//https://learn.microsoft.com/en-us/fluent-ui/web-components/components/card?pivots=typescript

//https://learn.microsoft.com/en-us/fluent-ui/web-components/components/checkbox?pivots=typescript
import {
    provideFluentDesignSystem,
    fluentButton,
    fluentCard,
    fluentCheckbox
} from "@fluentui/web-components";

provideFluentDesignSystem()
    .register(
        fluentButton()
    );

provideFluentDesignSystem()
    .register(
        fluentCard()
    );

provideFluentDesignSystem()
    .register(
        fluentCheckbox()
    );

//https://m3.material.io/components/text-fields/overview
//https://github.com/material-components/material-web/blob/main/docs/components/text-field.md
//https://material-web.dev/components/text-field/
//https://material-web.dev/components/text-field/stories/
import '@material/web/textfield/filled-text-field.js';
import '@material/web/button/text-button.js';
import '@material/web/button/outlined-button.js';


//https://material-web.dev/components/icon-button/
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button.js';

import '@material/web/progress/linear-progress.js';


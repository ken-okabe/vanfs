//https://learn.microsoft.com/en-us/fluent-ui/web-components/components/card?pivots=typescript

//https://learn.microsoft.com/en-us/fluent-ui/web-components/components/checkbox?pivots=typescript
import {
    provideFluentDesignSystem,
    fluentCard,
    fluentCheckbox
} from "@fluentui/web-components";

provideFluentDesignSystem()
    .register(
        fluentCard()
    );

provideFluentDesignSystem()
    .register(
        fluentCheckbox()
    );

//https://material-web.dev/components/icon-button/
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button.js';


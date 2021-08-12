import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";

import AppLocale from "../lngProvider";
import MainApp from "./MainApp";
/*import { onLayoutTypeChange, onNavStyleChange, setThemeType } from "../../appRedux/actions/Setting";*/


const App = (props) => {
    const {match, location} = props;
    const locale = useSelector(({settings}) => settings.locale);
    const currentAppLocale = AppLocale[locale.locale];
    return (

        <ConfigProvider locale={currentAppLocale.antd}>
            <IntlProvider
                locale={currentAppLocale.locale}
                messages={currentAppLocale.messages}>
                <Route path={`${match.url}`} component={MainApp} />
            </IntlProvider>
        </ConfigProvider>

    );

};

export default App;
import React, { Fragment, Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import Form from './components/Form/Form';
import Forbidden from './components/Forbidden/Forbidden';
import Statuses from './components/Statuses/Statuses';
import axios from './config/axios-config';

import enTranslations from './locales/app-en';
import itTranslations from './locales/app-it';

const languages = {
    en: enTranslations,
    it: itTranslations
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locale: "en",
            authenticating: false,
            startReset: false,
            successReset: false,
            failedReset: false,
            successfullyVerified: false,
        }
    }

    async componentDidMount() {
        const { history } = this.props;

        const urlParams = new URLSearchParams(history.location.search);

        if (urlParams.get('lang') && urlParams.get('lang') !== 'en')
            this.setState({ locale: urlParams.get('lang') });

        if (!urlParams.get('token')) {    // Security check
            history.push(`/forbidden?lang=${urlParams.get('lang') ? urlParams.get('lang') : "en"}`);
            document.title = 'Forbidden';
        } else {
            try {
                this.setState({ authenticating: true });
                await axios.get(`/check/valid/reset?token=${urlParams.get('token')}`);
                this.setState({ successfullyVerified: true, authenticating: false });
            } catch (e) {
                this.setState({ authenticating: false });
                history.push('/forbidden');
            }
        }
    }

    onResetPassword = async (password) => {
        const { history } = this.props;

        const urlParams = new URLSearchParams(history.location.search);
        this.setState({ startReset: true, successReset: false, failedReset: false });

        try {
            await axios.post('/users/me/submit-reset', {
                token: urlParams.get('token'),
                password
            });
            this.setState({ startReset: false, successReset: true });
        } catch (e) {
            this.setState({ startReset: false, failedReset: true });
        }

    };

    onResetStates = () => {
        this.setState({
            startReset: false,
            successReset: false,
            failedReset: false,
        });
    };

    render () {
        const { startReset, failedReset, successReset, successfullyVerified, authenticating } = this.state;

        const routes = successfullyVerified && !authenticating ? (
            <Switch>
                <Route path="/" exact render={() => <Form resetPassword={(password) => this.onResetPassword(password)} />} />
                <Route path="/forbidden" component={Forbidden} />
                <Route render={() => <p> Not found </p>}/>
            </Switch>
        ) : !successfullyVerified && !authenticating ? (
            <Switch>
                <Route path="/forbidden" exact component={Forbidden} />
                <Route render={() => <p> Not found </p>}/>
            </Switch>
        ) : null;

        return (
            <IntlProvider locale={this.state.locale} messages={languages[this.state.locale]}>
                <Fragment>
                    <Statuses startReset={startReset} failedReset={failedReset} authenticating={authenticating}
                              successReset={successReset} resetStates={this.onResetStates} />
                    { routes }
                </Fragment>
            </IntlProvider>
        )
    }
}

export default withRouter(App);

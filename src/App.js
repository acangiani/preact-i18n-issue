import { h, Component } from 'preact';
import { Router } from 'preact-router';

import { IntlProvider } from 'preact-i18n';
import es_i18n from './i18n/en.json';

import FirstView from './components/FirstView';
import SecondView from './components/SecondView';

class App extends Component {
  render(props, state) {
    return (
      <IntlProvider definition={es_i18n}>
        <div id="app">
          <Router url={props.url}>
            <FirstView path="/" />
            <SecondView path="/:slug" />
          </Router>
        </div>
      </IntlProvider>
    );
  }
};

export default App;

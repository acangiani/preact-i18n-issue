import { h, Component } from 'preact';
import { Text, Localizer } from 'preact-i18n';
import Helmet from "preact-helmet";

export default class SecondView extends Component {
  render(props, state) {
    return (
      <div>
         <Localizer>
          <Helmet
            title={<Text id="second.title" fields={{ field: props.slug }}></Text> }
            meta={[
              {name: "title", content: <Text id="second.title" fields={{ field: props.slug }}></Text> },
            ]}
          />
        </Localizer>
      </div>
    );
  }
};

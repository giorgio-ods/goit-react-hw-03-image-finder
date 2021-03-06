import { Component } from "react/cjs/react.production.min";
import Loader from "react-loader-spinner";

export default class App extends Component {
  render() {
    return (
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    );
  }
}

import Ents from '../../base/Ents.js';

export default class EntView {
  constructor(props) {
    super(props);
    this.state = {ent: undefined};
  }

  async componentDidMount() {
    const {entID} = this.props;
    const ent = await Ents.getEnt(entID);
    this.setState({ent});
  }

  render() {
    const {entID} = this.props;
    const {ent} = this.state;
    if (!ent) {
      return entID;
    }
    return ent.name;
  }
}

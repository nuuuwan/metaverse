export default class EntView {
  constructor(props) {
    super(props);
    this.state = {ent: undefined};
  }

  async componentDidMount() {
    const {entID} = this.props;
    const ent = await Ents.getEnt();
  }
}

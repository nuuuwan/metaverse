import "./SourceView.css";

export default function SourceView(props) {
  const { source } = props;
  return (
    <div className="div-layer-source">
      {"Source: "}
      <a className="a-layer-source-link" href={source} target="-_blank">
        {source}
      </a>
    </div>
  );
}

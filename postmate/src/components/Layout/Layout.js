import withClass from "../../hoc/withClass";
import style from "./Layout.module.css";

function Layout(props) {
  return (
    <>
      <div>{props.menu}</div>
      <div className={style.content}>{props.content}</div>
    </>
  );
}

export default withClass(Layout, "layout");

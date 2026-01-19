import { useEffect } from "react";

export default function Root(props) {
  useEffect(() => {
    const handlerClick = () => {
      console.log("click do navbar");
    };

    document.addEventListener("onNavbarClick", handlerClick);

    return () => {
      document.removeEventListener("onNavbarClick", handlerClick);
    };
  }, []);
  return <section>{props.name} is mounted!ALOOOOO</section>;
}

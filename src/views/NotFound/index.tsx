import img from "@/assets/imgs/404.png";

const NotFound = () => {
  return (
    <div
      className="center"
      style={{ height: "100%", background: "#ececec", overflow: "hidden" }}
    >
      <img
        src={img}
        alt="404"
      />
    </div>
  );
}

export default NotFound;

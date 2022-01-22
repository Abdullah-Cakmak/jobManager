import SvgIcon from "@mui/material/SvgIcon";
import LogoSVG from "../assets/logo.svg";

export default function Logo() {
  return (
    <img
      src={LogoSVG}
      alt="loadingScreen"
      style={{ height: 70, display: "flex" }}
    />
  );
}

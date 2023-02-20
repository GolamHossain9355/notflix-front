import { ThreeDots } from "react-loader-spinner";
import "./loading.css";

export default function Loading({ color="#FF0000", size=60, ht="100%" }){

  return (
    <div className="loading__wrapper" style={{ height: ht }}>
      <ThreeDots
         color={color}
         height={size}
         width={size}
      />
    </div>
  )
}
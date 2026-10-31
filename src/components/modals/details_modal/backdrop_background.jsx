import React from "react";
import '../../.././../assets/stylesheets/overlays.scss'
import { useEntityFocus } from "../../../hooks/useEntityFocus";
import { useSelector } from "react-redux";
import { selectScrollY } from "../../../features/ui/scroll_slice";

const BackdropBackground = () => {
    const { closeDetailsView } = useEntityFocus()
    const scrollY = useSelector(selectScrollY)

    return (
        <div className="backdrop-background-container" onClick={() => closeDetailsView({ scrollY })}>
        {/* <div className="backdrop-background-container"> */}
            <div className="backdrop-background"></div>
        </div>
    )
}

export default BackdropBackground

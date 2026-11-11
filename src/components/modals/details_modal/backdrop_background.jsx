import React from "react";
import '../../.././../assets/stylesheets/overlays.scss'
import { useEntityFocus } from "../../../hooks/useEntityFocus";
import { useSelector } from "react-redux";
import { selectScrollY } from "../../../features/ui/scroll_slice";
import { useLocation } from "react-router-dom";

const BackdropBackground = () => {
    const location = useLocation();

    const { closeDetailsView } = useEntityFocus()
    const scrollY = useSelector(selectScrollY)

    const isDeepLink = location.pathname.includes("/title/");

    return (
        <div className="backdrop-background-container" onClick={() => closeDetailsView({ scrollY, isDeepLink })}>
            <div className="backdrop-background"></div>
        </div>
    )
}

export default BackdropBackground

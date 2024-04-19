import platinumContextMenuStyles
    from "@/app/SystemFolder/SystemResources/ContextualMenu/ClassicyContextualMenu.module.scss";
import PlatinumMenu, {PlatinumMenuItem} from "@/app/SystemFolder/SystemResources/Menu/PlatinumMenu";
import platinumMenuStyles from "@/app/SystemFolder/SystemResources/Menu/PlatinumMenu.module.scss";
import React from "react";

interface PlatinumMenuProps {
    position: number[];
    menuItems: PlatinumMenuItem[];
}

const ClassicyContextualMenu: React.FC<PlatinumMenuProps> = ({menuItems, position}) => {

    return (
        <div className={platinumContextMenuStyles.platinumContextMenuWrapper}
             style={{left: position[0], top: position[1]}}>
            <PlatinumMenu menuItems={menuItems} subNavClass={platinumMenuStyles.platinumContextSubMenu}></PlatinumMenu>
        </div>
    )
};

export default ClassicyContextualMenu;


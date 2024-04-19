import platinumContextMenuStyles
    from "@/app/SystemFolder/SystemResources/ContextualMenu/ClassicyContextualMenu.module.scss";
import ClassicyMenu, {ClassicyMenuItem} from "@/app/SystemFolder/SystemResources/Menu/ClassicyMenu";
import platinumMenuStyles from "@/app/SystemFolder/SystemResources/Menu/ClassicyMenu.module.scss";
import React from "react";

interface PlatinumMenuProps {
    position: number[];
    menuItems: ClassicyMenuItem[];
}

const ClassicyContextualMenu: React.FC<PlatinumMenuProps> = ({menuItems, position}) => {

    return (
        <div className={platinumContextMenuStyles.platinumContextMenuWrapper}
             style={{left: position[0], top: position[1]}}>
            <ClassicyMenu menuItems={menuItems} subNavClass={platinumMenuStyles.platinumContextSubMenu}></ClassicyMenu>
        </div>
    )
};

export default ClassicyContextualMenu;


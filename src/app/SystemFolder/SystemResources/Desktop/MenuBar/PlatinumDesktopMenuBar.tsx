import {useDesktop, useDesktopDispatch} from '@/app/SystemFolder/SystemResources/AppManager/ClassicyAppManagerContext';
import platinumDesktopMenuStyles
    from "@/app/SystemFolder/SystemResources/Desktop/MenuBar/PlatinumDesktopMenuBar.module.scss";
import PlatinumDesktopMenuWidgetSound
    from "@/app/SystemFolder/SystemResources/Desktop/MenuBar/Widgets/Sound/PlatinumDesktopMenuWidgetSound";
import PlatinumDesktopMenuWidgetTime
    from "@/app/SystemFolder/SystemResources/Desktop/MenuBar/Widgets/Time/PlatinumDesktopMenuWidgetTime";
import PlatinumMenu, {PlatinumMenuItem} from "@/app/SystemFolder/SystemResources/Menu/PlatinumMenu";
import platinumMenuStyles from "@/app/SystemFolder/SystemResources/Menu/PlatinumMenu.module.scss";
import React from "react";


const PlatinumDesktopMenuBar: React.FC = () => {
    const desktopContext = useDesktop();
    const desktopEventDispatch = useDesktopDispatch();

    const systemMenuItem: PlatinumMenuItem = {
        id: "apple-menu",
        image: `${process.env.NEXT_PUBLIC_BASE_PATH}/img/icons/system/apple.png`,
        menuChildren: desktopContext.systemMenu,
        className: platinumDesktopMenuStyles.platinumDesktopMenuAppleMenu
    };

    const setActiveApp = (appId: string) => {
        desktopEventDispatch({
            type: "PlatinumAppFocus",
            app: {id: appId},
        })
    };

    let activeAppObject = desktopContext.openApps.filter((app) => app.id == desktopContext.activeApp);
    if (!activeAppObject.length) {
        activeAppObject = [{icon: `${process.env.NEXT_PUBLIC_BASE_PATH}/img/icons/system/macos.svg`, name: "Finder"}];
    }

    const appSwitcherMenuMenuItem: PlatinumMenuItem = {
        id: "app-switcher",
        image: activeAppObject[0].icon,
        title: activeAppObject[0].name,
        className: platinumDesktopMenuStyles.platinumDesktopMenuAppSwitcher,
        menuChildren: desktopContext.openApps.map((app) => ({
                id: app.id,
                icon: app.icon,
                title: app.name,
                onClickFunc: () => {
                    setActiveApp(app.id)
                }
            }
        ))
    }

    const defaultMenuItems = [].concat(
        systemMenuItem,
        desktopContext.menuBar,
        appSwitcherMenuMenuItem,
    ) as PlatinumMenuItem[];

    return (
        <nav className={platinumDesktopMenuStyles.platinumDesktopMenuBar}>
            <PlatinumMenu menuItems={defaultMenuItems} navClass={platinumDesktopMenuStyles.platinumDesktopMenu}
                          subNavClass={platinumMenuStyles.platinumSubMenu}>
                <PlatinumDesktopMenuWidgetSound></PlatinumDesktopMenuWidgetSound>
                <PlatinumDesktopMenuWidgetTime></PlatinumDesktopMenuWidgetTime>
            </PlatinumMenu>
        </nav>
    );
};

export default PlatinumDesktopMenuBar;


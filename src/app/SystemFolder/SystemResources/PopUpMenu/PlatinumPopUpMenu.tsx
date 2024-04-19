import ClassicyControlLabel from "@/app/SystemFolder/SystemResources/ControlLabel/ClassicyControlLabel";
import platinumPopUpMenuStyle from "@/app/SystemFolder/SystemResources/PopUpMenu/PlatinumPopUpMenu.module.scss";
import classNames from "classnames";
import React from "react";

type platinumPopUpMenuOptions = {
    value: string;
    label: string;
}

type platinumPopUpMenuProps = {
    id: string;
    label?: string;
    options: platinumPopUpMenuOptions[];
    selected?: string;
    small?: boolean;
    onChangeFunc?: any;
}
const PlatinumPopUpMenu: React.FC<platinumPopUpMenuProps> = (
    {
        id,
        label,
        options,
        selected,
        small = false,
        onChangeFunc
    }
) => {
    return (
        <div className={platinumPopUpMenuStyle.platinumPopUpMenuWrapper}>
            {label &&
                <ClassicyControlLabel label={label}></ClassicyControlLabel>
            }
            <div style={{flexGrow: "2"}}
                 className={classNames(
                     platinumPopUpMenuStyle.platinumPopUpMenu,
                     small ? platinumPopUpMenuStyle.platinumPopUpMenuSmall : ""
                 )}>
                <select
                    id={id}
                    tabIndex={0}
                    value={selected}
                    onChange={onChangeFunc}>
                    {options.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};
export default PlatinumPopUpMenu;

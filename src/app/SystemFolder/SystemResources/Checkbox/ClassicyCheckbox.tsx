import classicyCheckboxStyles from "@/app/SystemFolder/SystemResources/Checkbox/ClassicyCheckbox.module.scss";
import ClassicyControlLabel from "@/app/SystemFolder/SystemResources/ControlLabel/ClassicyControlLabel";
import classNames from "classnames";
import React from "react";

type ClassicyCheckboxProps = {
    id: string;
    name: string;
    checked?: boolean;
    mixed?: boolean;
    isDefault?: boolean;
    disabled?: boolean;
    onClick?: any;
    label?: string;
}
const ClassicyCheckbox: React.FC<ClassicyCheckboxProps> = (
    {
        id,
        name,
        checked,
        mixed,
        isDefault,
        disabled,
        onClick,
        label
    }
) => {

    return (
        <ClassicyControlLabel label={label} labelFor={id} disabled={disabled}>
            <div className={classicyCheckboxStyles.ClassicyCheckboxGroup}>
                <input type={"checkbox"} onClick={onClick}
                       tabIndex={0}
                       checked={checked}
                       id={id}
                       name={name}
                       disabled={disabled}
                       className={classNames(
                           classicyCheckboxStyles.ClassicyCheckbox,
                           isDefault ? classicyCheckboxStyles.ClassicyCheckboxDefault : "",
                           mixed ? classicyCheckboxStyles.ClassicyCheckboxMixed : ""
                       )}/>
            </div>
        </ClassicyControlLabel>
    );
};
export default ClassicyCheckbox;


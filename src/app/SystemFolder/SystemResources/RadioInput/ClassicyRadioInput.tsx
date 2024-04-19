import ClassicyControlLabel from "@/app/SystemFolder/SystemResources/ControlLabel/ClassicyControlLabel";
import classicyRadioInputStyles from "@/app/SystemFolder/SystemResources/RadioInput/ClassicyRadioInput.module.scss";
import {useSoundDispatch} from "@/app/SystemFolder/SystemResources/SoundManager/ClassicySoundManagerContext";
import classNames from "classnames";
import React, {MouseEventHandler} from "react";

type ClassicyRadioInputProps = {
    id: string;
    name: string;
    checked?: boolean;
    isDefault?: boolean;
    disabled?: boolean;
    onClick?: MouseEventHandler;
    label?: string;
}

const ClassicyRadioInput: React.FC<ClassicyRadioInputProps> = ({
                                                                   id,
                                                                   name,
                                                                   checked,
                                                                   isDefault,
                                                                   disabled,
                                                                   onClick,
                                                                   label
                                                               }) => {

    const player = useSoundDispatch();

    return (
        <div className={classicyRadioInputStyles.classicyRadioInputGroup}>
            <div className={classicyRadioInputStyles.classicyRadioInputWrapper}>
                <input type={"radio"} onClick={onClick}
                       tabIndex={0}
                       onMouseDown={() => {
                           player({type: "PlatinumSoundPlay", sound: "PlatinumInputRadioClickDown"})
                       }}
                       onMouseUp={() => {
                           player({type: "PlatinumSoundPlay", sound: "PlatinumInputRadioClickUp"})
                       }}
                       id={id}
                       name={name}
                       disabled={disabled}
                       className={classNames(
                           classicyRadioInputStyles.classicyRadioInput,
                           isDefault ? classicyRadioInputStyles.classicyRadioInputDefault : ""
                       )}/>
            </div>
            <ClassicyControlLabel labelFor={id} disabled={disabled} label={label}></ClassicyControlLabel>

        </div>
    );
};
export default ClassicyRadioInput;


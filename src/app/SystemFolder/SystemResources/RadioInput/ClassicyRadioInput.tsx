import ClassicyControlLabel from '@/app/SystemFolder/SystemResources/ControlLabel/ClassicyControlLabel'
import classicyRadioInputStyles from '@/app/SystemFolder/SystemResources/RadioInput/ClassicyRadioInput.module.scss'
import { useSoundDispatch } from '@/app/SystemFolder/ControlPanels/SoundManager/ClassicySoundManagerContext'
import classNames from 'classnames'
import React, { ChangeEvent, useState } from 'react'

type ClassicyRadioInputProps = {
    name: string
    label?: string
    align?: 'rows' | 'columns'
    disabled?: boolean
    onClickFunc?: (e: ChangeEvent<HTMLInputElement>) => void
    inputs: ClassicyRadioInputValueProps[]
}

type ClassicyRadioInputValueProps = {
    id: string
    checked?: boolean
    mixed?: boolean
    isDefault?: boolean
    disabled?: boolean
    label?: string
}

const ClassicyRadioInput: React.FC<ClassicyRadioInputProps> = ({
    name,
    label,
    align = 'columns',
    disabled = false,
    onClickFunc,
    inputs,
}) => {
    const [check, setCheck] = useState<string>(inputs.findLast((input) => input.checked === true)?.id || '')
    const player = useSoundDispatch()

    const handleOnChange = (e) => {
        setCheck(e.target.id)
        if (onClickFunc) {
            onClickFunc(e)
        }
    }

    return (
        <>
            {label && <ClassicyControlLabel labelFor={name} disabled={disabled} label={label} direction={'left'} />}
            <div
                className={classNames(
                    classicyRadioInputStyles.classicyRadioInputGroup,
                    align === 'columns' ? classicyRadioInputStyles.classicyRadioInputGroupColumns : ''
                )}
            >
                {inputs &&
                    inputs.map((item) => (
                        <div key={name + item.id} className={classicyRadioInputStyles.classicyRadioInputMargin}>
                            <div
                                className={classNames(
                                    classicyRadioInputStyles.classicyRadioInputWrapper,
                                    check === item.id ? classicyRadioInputStyles.classicyRadioInputWrapperChecked : '',
                                    item.disabled ? classicyRadioInputStyles.classicyRadioInputWrapperDisabled : ''
                                )}
                            >
                                <input
                                    id={item.id}
                                    name={name}
                                    disabled={item.disabled}
                                    className={classNames(
                                        classicyRadioInputStyles.classicyRadioInput,
                                        item.isDefault ? classicyRadioInputStyles.classicyRadioInputDefault : '',
                                        item.mixed ? classicyRadioInputStyles.classicyRadioInputMixed : ''
                                    )}
                                    type={'radio'}
                                    value={item.id}
                                    defaultChecked={item.checked}
                                    tabIndex={0}
                                    onChange={handleOnChange}
                                    onMouseDown={() => {
                                        player({ type: 'ClassicySoundPlay', sound: 'ClassicyInputRadioClickDown' })
                                    }}
                                    onMouseUp={() => {
                                        player({ type: 'ClassicySoundPlay', sound: 'ClassicyInputRadioClickUp' })
                                    }}
                                />
                            </div>
                            <ClassicyControlLabel
                                labelFor={item.id}
                                disabled={item.disabled}
                                label={item.label}
                                onClickFunc={handleOnChange}
                            />
                        </div>
                    ))}
            </div>
        </>
    )
}
export default ClassicyRadioInput

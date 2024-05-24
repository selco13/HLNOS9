export const hexToInt = (hex: string): number => {
    if (!hex.startsWith('0x')) {
    return Number(hex)
}

export const intToHex = (int: number): string => {
    return '#' + int.toString(16).padStart(6, '0')
}

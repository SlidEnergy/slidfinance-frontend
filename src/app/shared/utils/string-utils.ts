// Переводит первую букву строки в нижний регистр
export function lowerFirstLetter(value: string) {
    return value[0].toLowerCase() + value.substr(1, value.length)
}

/**
 * Преобразует в регистр по натации NewtonSoft Json
 */
export function newtonSoftLowerCamelCase(val: string) {
    /**
     *   Нотация NewtonSoft Json:
         AA_aa_BB -> aA_aa_BB
         AAaaBB -> aAaaBB
         aa_bbCc -> aa_bbCc
         aa_bb_cc -> aa_bb_cc
         AAA -> aaa
         AaaBbb  ->  aaaBbb
     */
    if (val.toUpperCase() === val) {
        return  val.toLowerCase();
    }
    else {
        return lowerFirstLetter(val);
    }
}

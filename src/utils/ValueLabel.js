export default class ValueLabel {

    constructor(val, lab){
        if (val === undefined) val = 0;
        if (lab === undefined) lab = '';
        this.value = val;
        this.label = lab;
    }
}

export function computeRa (ds, achievement) {
    let baseRa;

    if (achievement < 50) {
        baseRa = 7.0;
    } else if (achievement < 60) {
        baseRa = 8.0;
    } else if (achievement < 70) {
        baseRa = 9.6;
    } else if (achievement < 75) {
        baseRa = 11.2;
    } else if (achievement < 80) {
        baseRa = 12.0;
    } else if (achievement < 90) {
        baseRa = 13.6;
    } else if (achievement < 94) {
        baseRa = 15.2;
    } else if (achievement < 97) {
        baseRa = 16.8;
    } else if (achievement < 98) {
        baseRa = 20.0;
    } else if (achievement < 99) {
        baseRa = 20.3;
    } else if (achievement < 99.5) {
        baseRa = 20.8;
    } else if (achievement < 100) {
        baseRa = 21.1;
    } else {
        baseRa = 21.6;
    }

    return Math.floor(ds * Math.floor(ds * (achievement / 100) * baseRa));
}

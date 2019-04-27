export class Constraints {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  width?: number;
  height?: number;
}

/**
 * Parse constraint value and output to view object.
 * Each constraints are re-assigned later considering related margins.
 * https://medium.com/zendesk-engineering/reverse-engineering-sketchs-resizing-functionality-23f6aae2da1a
 * @param {number} value bitmasked constraint value
 * @returns {Constraints} parsed constraints object
 */
export function parseConstraint(value: number): Constraints {
  const bitWiseAnd: number = parseInt(value.toString(2));
  const bitWiseAndPadded: string = ("0000000000" + bitWiseAnd).slice(-6);
  const constraints: Constraints = {
    none: bitWiseAndPadded === "111111" ? 1 : 0,
    top: bitWiseAndPadded.substr(0, 1) === "0" ? 1 : 0,
    right: bitWiseAndPadded.substr(5, 1) === "0" ? 1 : 0,
    bottom: bitWiseAndPadded.substr(2, 1) === "0" ? 1 : 0,
    left: bitWiseAndPadded.substr(3, 1) === "0" ? 1 : 0,
    width: bitWiseAndPadded.substr(4, 1) === "0" ? 1 : 0,
    height: bitWiseAndPadded.substr(1, 1) === "0" ? 1 : 0
  } as Constraints;
  return constraints;
}

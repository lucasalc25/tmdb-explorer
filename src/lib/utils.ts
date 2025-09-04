export function classNames(
  ...classes: Array<string | undefined | null | false>
) {
  return classes.filter(Boolean).join(" ");
}

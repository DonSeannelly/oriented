
export function Injectable() {
  return <returnFunc extends Function>(target: returnFunc): returnFunc => {
    return undefined;
  }
}

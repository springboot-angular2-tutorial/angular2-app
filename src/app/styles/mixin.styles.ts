export function spinner(size: number): any {
  return {
    borderRadius: '50%',
    width: `${size}px`,
    height: `${size}px`,
    border: '.25rem solid rgba(128, 128, 128, 0.2)',
    borderTopColor: 'gray',
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: `-${size / 2}px`,
    marginTop: `-${size / 2}px`,
    animationName: {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '100%': {
        transform: 'rotate(360deg)',
      },
    },
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  };
}

import {StyleSheet} from "aphrodite";

export const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    zIndex: '999999',
    display: 'table',
  },
  toastBase: {
    color: 'white',
    opacity: '0.9',
    width: '285px',
    height: '65px',
    display: 'table-cell',
    verticalAlign: 'middle',
    fontWeight: 'bold',
    paddingLeft: '12px',
    boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.25)',
  },
  success: {
    backgroundColor: '#06BC5A',
  },
  warning: {
    backgroundColor: '#F97A1F',
  },
  error: {
    backgroundColor: '#F1432A',
  },
  fadeOut: {
    visibility: 'hidden',
    opacity: '0',
    transition: 'visibility 0s .2s, opacity .2s linear',
  }
});

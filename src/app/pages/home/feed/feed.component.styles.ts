import {StyleSheet} from "aphrodite";
import {list_1} from "../../../styles/shared.styles";
import {colors} from "../../../styles/colors.styles";

export const styles = StyleSheet.create({
  // list: {
  //   ...list_1,
  //   lineHeight: '20px',
  // },
  list: Object.assign({}, list_1, {
    lineHeight: '20px',
  }),
  gravatar: {
    float: 'left',
    marginRight: '8px',
  },
  content: {
    display: 'block',
  },
  timestamp: {
    color: colors.weakTextColor,
  },
});

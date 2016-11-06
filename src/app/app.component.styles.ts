import {StyleSheet} from "aphrodite";
import {colors} from "./styles/colors.styles";

export const styles = StyleSheet.create({
  footer: {
    marginTop: '24px',
    paddingTop: '4px',
    borderTop: `1px solid ${colors.borderColor}`,
    color: colors.weakTextColor,
  },
});

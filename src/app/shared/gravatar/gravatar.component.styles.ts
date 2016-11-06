import {StyleSheet} from "aphrodite";
import {spinner} from "../../styles/mixin.styles";

export const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  loading: spinner(24),
});

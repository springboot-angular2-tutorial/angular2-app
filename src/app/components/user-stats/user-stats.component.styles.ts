import {StyleSheet} from "aphrodite";
import {colors} from "../../styles/colors.styles";

export const styles = StyleSheet.create({
  gravatar: {
    float: 'left',
    marginRight: '8px',
  },
  section: {
    padding: '8px 0',
    borderBottom: `1px solid ${colors.borderColor}`,
  },
  userName: {
    fontSize: '1.4em',
    marginTop: 0,
    marginBottom: '4px',
  },
  userText: {
    display: 'block',
    marginBottom: '4px',
    lineHeight: 1,
  },
  relationshipsLeft: {
    float: 'left',
    padding: '0 8px 0 0',
  },
  relationshipsRight: {
    float: 'left',
    padding: '0 8px',
    borderLeft: '1px solid #e8e8e8',
  },
  relationshipsNumber: {
    display: 'block',
  },
});
